import express from 'express';
import {
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadProjectImage } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All routes below require JWT auth + admin role
// POST  /admin/projects      — Create project
// PUT   /admin/projects/:id  — Update project
// DELETE /admin/projects/:id — Delete project
router.post('/', protect, admin, uploadProjectImage.single('image'), createProject);
router.put('/:id', protect, admin, uploadProjectImage.single('image'), updateProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;
