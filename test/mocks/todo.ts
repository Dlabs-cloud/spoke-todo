import Chance from 'chance';

import { DB } from '../../src/datasource';
import { Todo, TodoStatus } from '../../src/datasource/entities/todo';

export const createTodo = (todo?: Partial<Todo>) => {
  const newTodo = new Todo();
  const chance = new Chance();
  newTodo.isDeleted = todo?.isDeleted || 0;
  newTodo.name = todo?.name || chance.sentence({ words: 5 });
  newTodo.createdAt = todo?.createdAt || chance.date();
  newTodo.updatedAt = todo?.updatedAt || chance.date();
  newTodo.status = todo?.status || TodoStatus.IN_PROGRESS;
  return DB.getRepository(Todo).save(newTodo);
};
