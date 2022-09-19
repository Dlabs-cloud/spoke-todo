import { NextFunction, Request, Response } from 'express';

import { DB } from '../../datasource';
import { Todo } from '../../datasource/entities/todo';
import { CustomError } from '../../utils/custom.error';

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const todo = await DB.getRepository(Todo).findOneBy({
    id: Number(id),
    isDeleted: false,
  });
  if (!todo) {
    throw new CustomError(404, 'notfound', 'Todo cannot be found');
  }
  await DB.getRepository(Todo).delete(todo.id);

  res.status(204);
  next();
};
