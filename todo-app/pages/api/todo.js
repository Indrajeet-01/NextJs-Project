// api/todos.js

import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const todos = await db.collection("todo").find({}).toArray();
    res.json(todos);
  } else if (req.method === "POST") {
    const { text } = req.body;
    const newTodo = { text, completed: false };
    const result = await db.collection("todo").insertOne(newTodo);
    res.json(result.ops[0]);
  }
}
