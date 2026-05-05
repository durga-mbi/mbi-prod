import express from 'express';
import {
  getAllContacts,
  markContactRead,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require JWT auth + admin role
// GET    /admin/contacts          — All contact messages (paginated)
// PUT    /admin/contacts/:id/read — Mark message as read
// DELETE /admin/contacts/:id      — Delete a message
router.get('/', protect, admin, getAllContacts);
router.put('/:id/read', protect, admin, markContactRead);
router.delete('/:id', protect, admin, deleteContact);

export default router;
