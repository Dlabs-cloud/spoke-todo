import Chance from 'chance';
import { agent as request } from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../src/app';
import { DB } from '../../src/datasource';
import { Todo } from '../../src/datasource/entities/todo';
import { createTodo } from '../mocks/todo';

describe('edit controller', () => {
  let dataSource: DataSource;
  let mockTodo: Partial<Todo>;
  let chance: Chance;
  beforeEach(async () => {
    dataSource = await DB.initialize();
    chance = new Chance();
    mockTodo = {
      name: chance.sentence({ words: 20 }),
    };
  });

  it('returns an 404 error when then a todo list cannot be found by id', async () => {
    const response = await request(app).patch('/api/todos/5').send(mockTodo);

    expect(response.status).toEqual(404);
    const body = response.body;
    expect(body.errorType).toEqual('notfound');
    expect(body.errorMessage).toEqual('Todo cannot be found');
  });

  it('updates the todo list when the todo list can be found by ID', async () => {
    const todo = await createTodo({ isDeleted: 0 });
    const response = await request(app).patch(`/api/todos/${todo.id}`).send(mockTodo);
    expect(response.status).toEqual(204);
    const body = response.body;
    const foundTodo = await dataSource.getRepository(Todo).findOne({
      where: { id: body.id },
    });
    expect(foundTodo).toBeDefined();
    expect(foundTodo.name).toEqual(mockTodo.name);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });
});
