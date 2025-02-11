import argon2 from "argon2";

/**
 * Encode plain password to hashed password
 *
 * @param {string} plainPassword
 * @returns {string}
 */
const hashPassword = async (plainPassword) => {
  return await argon2.hash(plainPassword);
};

/**
 * Compare plain password with encoded hash
 *
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {boolean}
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await argon2.verify(hashedPassword, plainPassword);
};

export default { hashPassword, verifyPassword };
