import express from 'express';
import { getAllProjects, getProjectById } from '../controllers/projectController.js';

const router = express.Router();

// GET /projects          — All projects (sorted, paginated, searchable)
// GET /projects/:id      — Single project
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

export default router;
