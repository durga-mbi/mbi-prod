import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { getPasswordValidationError, isValidFullName } from '../utils/authValidation.js';
import { clearAuthCookie, setAuthCookie } from '../utils/authCookie.js';

// ─── AUTH ─────────────────────────────────────────────────────────────────────

// @desc    Register a new user
// @route   POST /users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  if (!isValidFullName(name)) {
    res.status(400);
    throw new Error('First name and last name must contain only alphabets');
  }

  const passwordValidationError = getPasswordValidationError(password);
  if (passwordValidationError) {
    res.status(400);
    throw new Error(passwordValidationError);
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user & get token
// @route   POST /users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user
// @route   POST /users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: 'Logout successful',
    data: null,
  });
});

// @desc    Get logged-in user profile
// @route   GET /me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: user,
  });
});

// ─── ADMIN ─────────────────────────────────────────────────────────────────────

// @desc    Get all users (with pagination & search)
// @route   GET /admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';

  const query = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
    : {};

  const total = await User.countDocuments(query);
  const users = await User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: {
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    },
  });
});

// @desc    Admin create user (with role)
// @route   POST /admin/users
// @access  Private/Admin
export const adminCreateUser = asyncHandler(async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const role = req.body.role === 'admin' ? 'admin' : 'user';

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  if (!isValidFullName(name)) {
    res.status(400);
    throw new Error('Name must contain only alphabets');
  }

  const passwordValidationError = getPasswordValidationError(password);
  if (passwordValidationError) {
    res.status(400);
    throw new Error(passwordValidationError);
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

// @desc    Admin update user
// @route   PUT /admin/users/:id
// @access  Private/Admin
export const adminUpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const nextName = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const nextEmail = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const nextPassword = typeof req.body.password === 'string' ? req.body.password : '';
  const nextRole = req.body.role === 'admin' ? 'admin' : req.body.role === 'user' ? 'user' : '';

  // If password is being updated, let the pre-save hook hash it
  if (nextPassword) {
    const passwordValidationError = getPasswordValidationError(nextPassword);
    if (passwordValidationError) {
      res.status(400);
      throw new Error(passwordValidationError);
    }

    user.password = nextPassword;
  }
  if (nextName) {
    if (!isValidFullName(nextName)) {
      res.status(400);
      throw new Error('Name must contain only alphabets');
    }

    user.name = nextName;
  }
  if (nextEmail && nextEmail !== user.email) {
    const existingUser = await User.findOne({ email: nextEmail, _id: { $ne: user._id } });

    if (existingUser) {
      res.status(400);
      throw new Error('User with this email already exists');
    }

    user.email = nextEmail;
  }
  if (nextRole) user.role = nextRole;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      updatedAt: updatedUser.updatedAt,
    },
  });
});

// @desc    Admin delete user
// @route   DELETE /admin/users/:id
// @access  Private/Admin
export const adminDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('You cannot delete your own admin account');
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: { id: req.params.id },
  });
});
