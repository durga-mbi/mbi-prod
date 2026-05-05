import express from 'express';
import { getMe } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /me  — Get logged-in user profile (requires valid JWT)
router.get('/', protect, getMe);

export default router;
