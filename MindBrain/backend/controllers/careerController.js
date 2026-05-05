import asyncHandler from 'express-async-handler';
import CareerApplication from '../models/CareerApplication.js';

const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const PHONE_PATTERN = /^\d{10}$/;

// @desc    Submit a career application
// @route   POST /careers
// @access  Private
export const createCareerApplication = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    position,
    experience,
    portfolioUrl = '',
    skills = [],
    consent,
    resume,
  } = req.body;

  if (!fullName || !email || !phone || !position || !experience) {
    res.status(400);
    throw new Error('Full name, email, phone, position, and experience are required');
  }

  if (!PHONE_PATTERN.test(String(phone).trim())) {
    res.status(400);
    throw new Error('Phone number must be exactly 10 digits');
  }

  if (!consent) {
    res.status(400);
    throw new Error('Privacy consent is required');
  }

  if (!resume?.fileName || !resume?.mimeType || !resume?.data || !resume?.size) {
    res.status(400);
    throw new Error('Resume file is required');
  }

  if (!ALLOWED_RESUME_TYPES.has(resume.mimeType)) {
    res.status(400);
    throw new Error('Resume must be a PDF, DOC, or DOCX file');
  }

  if (resume.size > 5 * 1024 * 1024) {
    res.status(400);
    throw new Error('Resume file size must be under 5MB');
  }

  const normalizedBase64 = String(resume.data).replace(/^data:.*;base64,/, '');

  // 90 days duplicate submission check
  const existingApplication = await CareerApplication.findOne({
    $or: [{ email: String(email).toLowerCase() }, { phone: String(phone).trim() }],
  }).sort({ createdAt: -1 });

  if (existingApplication) {
    const now = new Date();
    const prevDate = new Date(existingApplication.createdAt);
    const diffTime = Math.abs(now.getTime() - prevDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 90) {
      const remainingDays = 90 - diffDays;
      const nextAllowedDate = new Date(prevDate);
      nextAllowedDate.setDate(nextAllowedDate.getDate() + 90);
      
      return res.status(429).json({
        success: false,
        message: "You have already submitted your application.",
        previousSubmissionDate: prevDate,
        nextAllowedDate: nextAllowedDate,
        remainingDays: remainingDays
      });
    }
  }

  const application = await CareerApplication.create({
    fullName,
    email,
    phone: String(phone).trim(),
    position,
    experience,
    portfolioUrl,
    skills: Array.isArray(skills) ? skills : [],
    consent: Boolean(consent),
    resume: {
      fileName: resume.fileName,
      mimeType: resume.mimeType,
      size: resume.size,
      data: Buffer.from(normalizedBase64, 'base64'),
    },
  });

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: {
      id: application._id,
      fullName: application.fullName,
      email: application.email,
      position: application.position,
      createdAt: application.createdAt,
    },
  });
});

// @desc    Get all career applications
// @route   GET /admin/careers
// @access  Private/Admin
export const getAllCareerApplications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const search = String(req.query.search || '').trim();

  const query = search
    ? {
        $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { position: { $regex: search, $options: 'i' } },
          { experience: { $regex: search, $options: 'i' } },
          { skills: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const total = await CareerApplication.countDocuments(query);
  const applications = await CareerApplication.find(query)
    .select('-resume.data')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    message: 'Career applications fetched successfully',
    data: {
      applications,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    },
  });
});

// @desc    Download a career application resume
// @route   GET /admin/careers/:id/resume
// @access  Private/Admin
export const downloadCareerResume = asyncHandler(async (req, res) => {
  const application = await CareerApplication.findById(req.params.id);

  if (!application || !application.resume?.data) {
    res.status(404);
    throw new Error('Career application resume not found');
  }

  res.setHeader('Content-Type', application.resume.mimeType);
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${encodeURIComponent(application.resume.fileName)}"`
  );

  res.status(200).send(application.resume.data);
});

// @desc    Delete a career application
// @route   DELETE /admin/careers/:id
// @access  Private/Admin
export const deleteCareerApplication = asyncHandler(async (req, res) => {
  const application = await CareerApplication.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Career application not found');
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Career application deleted successfully',
    data: { id: req.params.id },
  });
});
