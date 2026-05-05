import mongoose from 'mongoose';

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
      trim: true,
    },
    portfolioUrl: {
      type: String,
      default: '',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    consent: {
      type: Boolean,
      required: true,
      default: false,
    },
    resume: {
      fileName: {
        type: String,
        required: [true, 'Resume file name is required'],
      },
      mimeType: {
        type: String,
        required: [true, 'Resume type is required'],
      },
      size: {
        type: Number,
        required: [true, 'Resume size is required'],
      },
      data: {
        type: Buffer,
        required: [true, 'Resume data is required'],
      },
    },
  },
  {
    timestamps: true,
  }
);

const CareerApplication = mongoose.model('CareerApplication', careerApplicationSchema);

export default CareerApplication;
