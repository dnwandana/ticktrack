/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("labels").del();

  await knex("labels").insert([
    {
      name: "bug",
      description:
        "A problem causing incorrect behavior or errors in the system.",
      color: "#d32f2f",
    },
    {
      name: "documentation",
      description:
        "Changes, improvements, or additions to project documentation.",
      color: "#43a047",
    },
    {
      name: "duplicate",
      description: "This issue or pull request already exists.",
      color: "#5c6bc0",
    },
    {
      name: "enhancement",
      description: "A request for improving or adding new functionality.",
      color: "#f39c12",
    },
    {
      name: "good first issue",
      description: "A simple issue suitable for newcomers.",
      color: "#ba68c8",
    },
    {
      name: "help wanted",
      description: "This issue requires additional input or assistance.",
      color: "#ff7043",
    },
    {
      name: "invalid",
      description:
        "This issue is incorrect, unclear, or does not meet requirements.",
      color: "#f57c00",
    },
    {
      name: "question",
      description: "A request for more information or clarification.",
      color: "#1976d2",
    },
    {
      name: "wontfix",
      description:
        "This issue will not be addressed due to scope or feasibility.",
      color: "#78909c",
    },
  ]);
};
