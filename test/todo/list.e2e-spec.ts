import { agent as request } from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../src/app';
import { DB } from '../../src/datasource';
import { TodoStatus } from '../../src/datasource/entities/todo';
import { createTodo } from '../mocks/todo';

describe('list controller', () => {
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = await DB.initialize();
  });

  it('returns all the todo list that is created', async () => {
    await createTodo();
    await createTodo();
    await createTodo();
    const response = await request(app).get('/api/todos');
    expect(response.status).toEqual(200);
    const body = response.body;
    expect(body.length).toEqual(3);
  });

  it('returns an empty array when all the todo list isDeleted column is set to 1', async () => {
    await createTodo({ isDeleted: 1 });
    await createTodo({ isDeleted: 0 });
    await createTodo({ isDeleted: 1 });
    const response = await request(app).get('/api/todos');
    expect(response.status).toEqual(200);
    const body = response.body;
    expect(body.length).toEqual(1);
  });

  it('returns right key values when in the list when the list of todos is returned', async () => {
    await createTodo({ name: 'todo name', status: TodoStatus.COMPLETED });
    const response = await request(app).get('/api/todos');
    expect(response.status).toEqual(200);
    const body = response.body;
    expect(body.length).toEqual(1);
    const todo = body[0];
    expect(todo.name).toEqual('todo name');
    expect(todo.status).toBe(TodoStatus.COMPLETED);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });
});
