import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    cvLink: {
      type: String, // URL to uploaded CV
    },
    skills: {
      type: [String],
    },
    experienceYears: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;
