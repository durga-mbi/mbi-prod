import express from 'express';
import asyncHandler from 'express-async-handler';
import UserInfo from '../models/UserInfo.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /users-info/add
// @desc    Add or update details for the logged-in user
// @access  Private
router.post(
  '/add',
  protect,
  asyncHandler(async (req, res) => {
    const { phoneNumber, cvLink, skills, experienceYears } = req.body;

    let userInfo = await UserInfo.findOne({ user: req.user._id });

    if (userInfo) {
      // Update existing info
      userInfo.phoneNumber = phoneNumber || userInfo.phoneNumber;
      userInfo.cvLink = cvLink || userInfo.cvLink;
      userInfo.skills = skills || userInfo.skills;
      userInfo.experienceYears = experienceYears || userInfo.experienceYears;

      const updatedInfo = await userInfo.save();
      return res.json(updatedInfo);
    } else {
      // Create new info
      userInfo = await UserInfo.create({
        user: req.user._id,
        phoneNumber,
        cvLink,
        skills,
        experienceYears,
      });

      return res.status(201).json(userInfo);
    }
  })
);

export default router;
