import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo } from '../../datasource/entities/todo';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.query;
  const todoQuery = DB.getRepository(Todo).createQueryBuilder('todo');
  todoQuery.where('todo.isDeleted = :deleted', { deleted: 0 });
  if (status) {
    todoQuery.where('todo.status = :status', { status });
  }

  type TodoItem = Omit<Todo, 'isDeleted'>;
  const todoList: TodoItem[] = (await todoQuery.getMany()).map(({ isDeleted, ...rest }) => {
    return rest;
  });
  res.status(200).json(todoList);
  next();
};
