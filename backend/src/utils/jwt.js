import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} = process.env;

/**
 * Generates a short-lived access token for a user.
 *
 * @param {Object} user - The user object.
 * @param {number} user.id - The unique identifier of the user.
 * @param {string} user.username - The username of the user.
 * @returns {string} The generated access token.
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );
};

/**
 * Generates a long-lived refresh token for a user.
 *
 * @param {Object} user - The user object.
 * @param {number} user.id - The unique identifier of the user.
 * @param {string} user.username - The username of the user.
 * @returns {string} The generated refresh token.
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );
};

/**
 * Verifies an access token.
 *
 * @param {string} token - The access token to verify.
 * @returns {Object} The decoded token payload if valid.
 * @throws {Error} If the token is invalid or expired.
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

/**
 * Verifies a refresh token.
 *
 * @param {string} token - The refresh token to verify.
 * @returns {Object} The decoded token payload if valid.
 * @throws {Error} If the token is invalid or expired.
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

/**
 * Refreshes the access token using a valid refresh token.
 *
 * @param {string} refreshToken - The refresh token provided by the client.
 * @returns {string} A new access token.
 * @throws {Error} If the refresh token is invalid or expired.
 */
const refreshAccessToken = (refreshToken) => {
  try {
    // verify the refresh token
    const payload = verifyRefreshToken(refreshToken);

    // generate a new access token using the payload
    return generateAccessToken(payload);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  refreshAccessToken,
};
