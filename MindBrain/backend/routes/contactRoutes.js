import express from 'express';
import { createContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// POST /contacts  — Public contact form submission (rate limited)
router.post('/', contactLimiter, createContact);

export default router;
