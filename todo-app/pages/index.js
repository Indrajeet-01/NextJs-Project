// pages/index.js

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("/api/todo");
      setTodos(response.data);
    }

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const response = await axios.post("/api/todo", { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
}
