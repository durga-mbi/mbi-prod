import asyncHandler from 'express-async-handler';
import fs from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import Project from '../models/Project.js';
import { projectUploadsDir } from '../middleware/uploadMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const CLOUDINARY_UPLOAD_FOLDER = process.env.CLOUDINARY_PROJECT_FOLDER || 'uploads/projects';

const getCloudinaryConfig = () => {
  // const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary project image configuration is missing');
  }

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
};
// console.log(getCloudinaryConfig());


const configureCloudinary = () => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
};

const uploadProjectImageToCloudinary = async (file) => {
  if (!file?.buffer) {
    return '';
  }

  configureCloudinary();

  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder: CLOUDINARY_UPLOAD_FOLDER,
      resource_type: 'image',
      filename_override: file.originalname || undefined,
      unique_filename: true,
    }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });

    uploadStream.end(file.buffer);
  });

  return uploadResult?.secure_url || uploadResult?.url || '';
};

const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl) {
    return '';
  }

  try {
    const url = new URL(imageUrl);
    const uploadMarker = '/image/upload/';
    const uploadIndex = url.pathname.indexOf(uploadMarker);

    if (uploadIndex === -1) {
      return '';
    }

    let publicPath = url.pathname.slice(uploadIndex + uploadMarker.length);
    publicPath = publicPath.replace(/^v\d+\//, '');
    publicPath = publicPath.replace(/\.[^.]+$/, '');

    return decodeURIComponent(publicPath);
  } catch {
    return '';
  }
};

const deleteProjectImageFromCloudinary = async (imageUrl) => {
  const publicId = getCloudinaryPublicId(imageUrl);

  if (!publicId) {
    return;
  }

  configureCloudinary();
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
    invalidate: true,
  });

  if (!result || (result.result !== 'ok' && result.result !== 'not found')) {
    throw new Error('Unable to remove project image from Cloudinary');
  }
};

const parseTechnologies = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== 'string') {
    return [];
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Fall back to comma or line separated text.
  }

  return trimmed
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const removeLocalProjectImage = async (imagePath) => {
  if (!imagePath) {
    return;
  }

  const normalized = String(imagePath).replace(/\\/g, '/');
  const prefix = '/api/uploads/projects/';

  if (!normalized.startsWith(prefix)) {
    return;
  }

  const fileName = normalized.slice(prefix.length);
  if (!fileName) {
    return;
  }

  const absolutePath = path.join(projectUploadsDir, path.basename(fileName));

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
};

const removeProjectImage = async (imagePath) => {
  if (!imagePath) {
    return;
  }

  if (String(imagePath).includes('res.cloudinary.com')) {
    await deleteProjectImageFromCloudinary(imagePath);
    return;
  }

  await removeLocalProjectImage(imagePath);
};

const getProjectPayload = async (req, existingProject = null) => {
  const {
    title,
    description,
    client,
    category,
    domain,
    liveUrl,
    githubUrl,
  } = req.body;

  const nextImage = req.file
    ? await uploadProjectImageToCloudinary(req.file)
    : typeof req.body.image === 'string'
      ? req.body.image.trim()
      : existingProject?.image || '';

  return {
    title: typeof title === 'string' ? title.trim() : existingProject?.title || '',
    description: typeof description === 'string' ? description.trim() : existingProject?.description || '',
    image: nextImage,
    technologies: parseTechnologies(req.body.technologies),
    client: typeof client === 'string' ? client.trim() : existingProject?.client || '',
    category: typeof category === 'string' ? category.trim() : existingProject?.category || '',
    domain: typeof domain === 'string' ? domain.trim() : existingProject?.domain || '',
    liveUrl: typeof liveUrl === 'string' ? liveUrl.trim() : existingProject?.liveUrl || '',
    githubUrl: typeof githubUrl === 'string' ? githubUrl.trim() : existingProject?.githubUrl || '',
  };
};

// ─── PUBLIC ───────────────────────────────────────────────────────────────────

// @desc    Get all projects (sorted by latest, with optional pagination & search)
// @route   GET /projects
// @access  Public
export const getAllProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = String(req.query.search || '').trim();
  const category = String(req.query.category || '').trim();

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { client: { $regex: search, $options: 'i' } },
      { domain: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { technologies: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) {
    query.category = { $regex: `^${category}$`, $options: 'i' };
  }

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    message: 'Projects fetched successfully',
    data: {
      projects,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    },
  });
});

// @desc    Get a single project by ID
// @route   GET /projects/:id
// @access  Public
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json({
    success: true,
    message: 'Project fetched successfully',
    data: project,
  });
});

// ─── ADMIN ────────────────────────────────────────────────────────────────────

// @desc    Create a new project
// @route   POST /admin/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const payload = await getProjectPayload(req);

  if (!payload.title || !payload.description) {
    await removeProjectImage(payload.image);
    res.status(400);
    throw new Error('Title and description are required');
  }

  const project = await Project.create(payload);

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

// @desc    Update a project
// @route   PUT /admin/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const previousImage = project.image;
  const payload = await getProjectPayload(req, project);

  if (!payload.title || !payload.description) {
    if (req.file && payload.image && payload.image !== previousImage) {
      await removeProjectImage(payload.image);
    }
    res.status(400);
    throw new Error('Title and description are required');
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (previousImage && previousImage !== updated.image) {
    await removeProjectImage(previousImage);
  }

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: updated,
  });
});

// @desc    Delete a project
// @route   DELETE /admin/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  await removeProjectImage(project.image);
  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
    data: { id: req.params.id },
  });
});
