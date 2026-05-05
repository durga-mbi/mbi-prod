import express from 'express';
import {
  getAllCareerApplications,
  downloadCareerResume,
  deleteCareerApplication,
} from '../controllers/careerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', protect, admin, getAllCareerApplications);
router.get('/:id/resume', protect, admin, downloadCareerResume);
router.delete('/:id', protect, admin, deleteCareerApplication);

export default router;
