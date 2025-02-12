import database from "../config/database.js";

const insert = async (payload) => {
  return await database("statuses").insert(payload);
};

const findOne = async (condition) => {
  return await database("statuses").where(condition).first();
};

const findAll = async () => {
  return await database("statuses").select("*");
};

const update = async (condition, payload) => {
  return await database("statuses").where(condition).update(payload);
};

const remove = async (condition) => {
  return await database("statuses").where(condition).delete();
};

export default { insert, findOne, findAll, update, remove };
