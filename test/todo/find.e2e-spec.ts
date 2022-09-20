import { agent as request } from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../src/app';
import { DB } from '../../src/datasource';
import { createTodo } from '../mocks/todo';

describe('find controller', () => {
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = await DB.initialize();
  });

  it('returns an 404 error when then a todo list cannot be found by id', async () => {
    const response = await request(app).get('/api/todos/5');
    expect(response.status).toEqual(404);
    const body = response.body;
    expect(body.errorType).toEqual('notfound');
    expect(body.errorMessage).toEqual('Todo cannot be found');
  });

  it('returns a 404 error when the todo list is deleted', async () => {
    const todo = await createTodo({ isDeleted: 1 });
    const response = await request(app).get(`/api/todos/${todo.id}`);
    expect(response.status).toEqual(404);
    const body = response.body;
    expect(body.errorType).toEqual('notfound');
    expect(body.errorMessage).toEqual('Todo cannot be found');
  });

  it('return a todo list when todo list is fetched by ID that exists', async () => {
    const todo = await createTodo({ isDeleted: 0 });
    const response = await request(app).get(`/api/todos/${todo.id}`);
    expect(response.status).toEqual(200);
    const body = response.body;
    expect(body.name).toBe(todo.name);
    expect(body.id).toBe(todo.id);
    expect(body.status).toBe(todo.status);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });
});
