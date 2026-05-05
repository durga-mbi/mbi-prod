import express from 'express';
import {
  getAllUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require JWT auth + admin role
// GET    /admin/users      — List all users (paginated, searchable)
// POST   /admin/users      — Create a user (with role)
// PUT    /admin/users/:id  — Update user details
// DELETE /admin/users/:id  — Delete user
router.get('/', protect, admin, getAllUsers);
router.post('/', protect, admin, adminCreateUser);
router.put('/:id', protect, admin, adminUpdateUser);
router.delete('/:id', protect, admin, adminDeleteUser);

export default router;
