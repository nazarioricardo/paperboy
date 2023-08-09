import express, { Request, Response } from "express";
import { Todo } from "../../models/todo";

const router = express.Router();

router.get("/api/todo", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.find();

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/api/todo", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const todo = Todo.build({ title, description });
    await todo.save();

    return res.status(201).send(todo);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { router as todoRouter };
