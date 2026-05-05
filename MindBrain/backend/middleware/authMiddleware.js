import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { getAuthTokenFromRequest } from '../utils/authCookie.js';

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
// Verifies JWT and attaches user to req.user
export const protect = asyncHandler(async (req, res, next) => {
  const token = getAuthTokenFromRequest(req);
console.log("api being hit");

  if (!token) {
    res.status(401);
    throw new Error('Not authorized — no token provided');
  }

  console.log(token);
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized — user no longer exists');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized — token invalid or expired');
  }
});

// ─── ADMIN MIDDLEWARE ─────────────────────────────────────────────────────────
// Must be used AFTER protect middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied — admin role required');
  }
};
