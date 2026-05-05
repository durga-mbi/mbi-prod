import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

// POST /users/register  — Register a new user
// POST /users/login     — Login and get JWT token
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
