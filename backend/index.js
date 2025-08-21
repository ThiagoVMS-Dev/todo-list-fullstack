const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Listar tarefas
app.get("/tasks", async (req, res) => {
  const tasks = await db("tasks").select("*");
  res.json(tasks);
});

// Adicionar tarefa
app.post("/tasks", async (req, res) => {
  const [id] = await db("tasks").insert({ text: req.body.text });
  const task = await db("tasks").where({ id }).first();
  res.json(task);
});

// Alternar concluída
app.put("/tasks/:id", async (req, res) => {
  const task = await db("tasks").where({ id: req.params.id }).first();
  if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

  await db("tasks")
    .where({ id: req.params.id })
    .update({ done: !task.done });

  const updated = await db("tasks").where({ id: req.params.id }).first();
  res.json(updated);
});

// Remover tarefa
app.delete("/tasks/:id", async (req, res) => {
  await db("tasks").where({ id: req.params.id }).del();
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend rodando na porta 5000 🚀"));
