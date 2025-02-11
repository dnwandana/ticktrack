import database from "../config/database.js";

const insert = async (payload) => {
  return await database("users").insert(payload);
};

const findOne = async (condition) => {
  return await database("users").where(condition).first();
};

const update = async (condition, payload) => {
  return await database("users").where(condition).update(payload);
};

export default { insert, findOne, update };
