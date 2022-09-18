import { Request, Response } from 'express';

export const list = (req: Request, res: Response) => {
  return res.json('A list of todo list');
};
