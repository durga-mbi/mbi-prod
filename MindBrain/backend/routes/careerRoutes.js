import express from 'express';
import { createCareerApplication } from '../controllers/careerController.js';
import { careerLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/', careerLimiter, createCareerApplication);

export default router;
