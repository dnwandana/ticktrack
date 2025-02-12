/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("statuses").del();

  await knex("statuses").insert([
    {
      name: "not started",
      description:
        "Tasks that haven't been initiated yet and are pending action.",
      color: "#f39c12",
    },
    {
      name: "ongoing",
      description:
        "Tasks that are currently in progress and actively being worked on.",
      color: "#3498db",
    },
    {
      name: "needs review",
      description:
        "Tasks that require evaluation or approval before proceeding further.",
      color: "#8e44ad",
    },
    {
      name: "closed",
      description: "Tasks that have been concluded and are no longer active.",
      color: "#2c3e50",
    },
    {
      name: "completed",
      description:
        "Tasks that have been successfully finished and require no further action.",
      color: "#2ecc71",
    },
  ]);
};
