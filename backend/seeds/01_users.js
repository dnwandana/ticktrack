/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("users").del();

  const usernames = [
    "AlexMorrisTech",
    "EmmaJenkinsDev",
    "DanielCarterCode",
    "SophiaMartinez",
    "LiamBrownie",
    "OliviaWilsonX",
    "JakeAndersonDev",
    "NinaParkerWrites",
    "ChrisThompson",
    "EthanWalkerX",
  ];

  // supersecret
  const hashedPassword =
    "$argon2id$v=19$m=65536,t=3,p=4$PCwCNZ//dIhFW+yOCIbKzg$nMnJd9hS+CyT900s8oYnsCGX9gNEzFovs9NuwASE89o";

  const users = [];

  for (const username of usernames) {
    users.push({
      username: username,
      password: hashedPassword,
    });
  }

  await knex("users").insert(users);
};
