import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo, TodoStatus } from '../../datasource/entities/todo';
import { CustomError } from '../../utils/custom.error';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const todo = await DB.getRepository(Todo).findOneBy({
    id: Number(id),
    isDeleted: 0,
  });
  if (!todo) {
    const error = new CustomError(404, 'notfound', 'Todo cannot be found');
    next(error);
    return;
  }
  todo.name = name;
  todo.status = status;
  await DB.getRepository(Todo).save(todo);
  res.status(204).json();
  next();
};
