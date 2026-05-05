import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

const PHONE_PATTERN = /^\d{10}$/;

// @desc    Submit a contact form
// @route   POST /contacts
// @access  Private
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  const normalizedPhone = String(phone || '').trim();

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required');
  }

  if (normalizedPhone && !PHONE_PATTERN.test(normalizedPhone)) {
    res.status(400);
    throw new Error('Phone number must be exactly 10 digits');
  }

  const contact = await Contact.create({ name, email, phone: normalizedPhone, message });

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully',
    data: contact,
  });
});

// @desc    Get all contact messages
// @route   GET /admin/contacts
// @access  Private/Admin
export const getAllContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const total = await Contact.countDocuments();
  const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

  res.status(200).json({
    success: true,
    message: 'Contacts fetched successfully',
    data: {
      contacts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    },
  });
});

// @desc    Mark a contact message as read
// @route   PUT /admin/contacts/:id/read
// @access  Private/Admin
export const markContactRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  res.status(200).json({
    success: true,
    message: 'Contact marked as read',
    data: contact,
  });
});

// @desc    Delete a contact message
// @route   DELETE /admin/contacts/:id
// @access  Private/Admin
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact message not found');
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully',
    data: { id: req.params.id },
  });
});
