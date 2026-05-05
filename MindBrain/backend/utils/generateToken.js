import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT token for authentication.
 * @param {string} id - MongoDB user _id
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured on the server');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

export default generateToken;
