import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo } from '../../entities/todo';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.query;
  const todoQuery = DB.getRepository(Todo).createQueryBuilder();
  if (status) {
    todoQuery.where('status = :status', { status });
  }
  const todos = await todoQuery.getMany();
  res.status(200).json(todos);
  next();
};
