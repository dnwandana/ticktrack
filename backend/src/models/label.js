import database from "../config/database.js";

const insert = async (payload) => {
  return await database("labels").insert(payload);
};

const findOne = async (condition) => {
  return await database("labels").where(condition).first();
};

const findAll = async () => {
  return await database("labels").select("*");
};

const update = async (condition, payload) => {
  return await database("labels").where(condition).update(payload);
};

const remove = async (condition) => {
  return await database("labels").where(condition).delete();
};

export default { insert, findOne, findAll, update, remove };
