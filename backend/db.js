const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data.sqlite" // arquivo do banco
  },
  useNullAsDefault: true
});

// Criar tabela caso não exista
db.schema.hasTable("tasks").then(exists => {
  if (!exists) {
    return db.schema.createTable("tasks", table => {
      table.increments("id").primary();
      table.string("text");
      table.boolean("done").defaultTo(false);
    });
  }
});

module.exports = db;
