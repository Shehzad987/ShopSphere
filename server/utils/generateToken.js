import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT for a given user id.
 * @param {string} id - Mongo user _id
 * @returns {string} signed JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

export default generateToken;
