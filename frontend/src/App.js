import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Buscar tarefas ao carregar
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  // Adicionar tarefa
  const addTask = () => {
    if (!newTask) return;
    axios.post("http://localhost:5000/tasks", { text: newTask }).then((res) => {
      setTasks([...tasks, res.data]);
      setNewTask("");
    });
  };

  // Alternar concluída
  const toggleTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`).then((res) => {
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    });
  };

  // Deletar tarefa
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          📋 To-Do List
        </h1>

        {/* Input + botão */}
        <div className="flex mb-6">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Digite uma tarefa..."
            className="flex-1 border rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700 transition-colors"
          >
            Adicionar
          </button>
        </div>

        {/* Lista */}
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <span
                onClick={() => toggleTask(t.id)}
                className={`cursor-pointer select-none ${
                  t.done
                    ? "line-through text-gray-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Mensagem se não houver tarefas */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            Nenhuma tarefa por aqui... 👀
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
