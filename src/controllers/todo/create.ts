import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo, TodoStatus } from '../../entities/todo';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { note, status } = req.body;
  let todo = new Todo();
  todo.status = status || TodoStatus.IN_PROGRESS;
  todo.note = note;
  todo = await DB.getRepository(Todo).save(todo);
  res.status(201).json({ id: todo.id });
  next();
};
