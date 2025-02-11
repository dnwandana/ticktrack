import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const database = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

export default database;
