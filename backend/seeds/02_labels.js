/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex("labels").del();

  await knex("labels").insert([
    {
      name: "bug",
      description: "Something isn't working",
      color: "#ffad99",
    },
    {
      name: "documentation",
      description: "Improvements or additions to documentation",
      color: "#99ffad",
    },
    {
      name: "duplicate",
      description: "This issue or pull request already exists",
      color: "#99adff",
    },
    {
      name: "enhancement",
      description: "New feature or request",
      color: "#f9e79f",
    },
    {
      name: "good first issue",
      description: "Good for newcomers",
      color: "#d7bde2",
    },
    {
      name: "help wanted",
      description: "Extra attention is needed",
      color: "#f5b7b1",
    },
    {
      name: "invalid",
      description: "This doesn't seem right",
      color: "#abecc6",
    },
    {
      name: "question",
      description: "Further information is requested",
      color: "#a9cce3",
    },
    {
      name: "wontfix",
      description: "This will not be worked on",
      color: "#a2d9ce",
    },
  ]);
};
