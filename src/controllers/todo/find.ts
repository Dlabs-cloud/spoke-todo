import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo } from '../../datasource/entities/todo';
import { CustomError } from '../../utils/custom.error';

export const find = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const todo = await DB.getRepository(Todo).findOneBy({
    id: Number(id),
    isDeleted: 0,
  });
  if (!todo) {
    const error = new CustomError(404, 'notfound', 'Todo cannot be found');
    next(error);
    return;
  }
  type TodoItem = Omit<Todo, 'isDeleted'>;

  const todoResponse: TodoItem = {
    createdAt: todo.createdAt,
    id: todo.id,
    name: todo.name,
    status: todo.status,
    updatedAt: todo.updatedAt,
  };

  res.status(200).json(todoResponse);
  next();
};
