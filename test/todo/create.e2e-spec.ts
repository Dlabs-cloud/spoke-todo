import Chance from 'chance';
import { agent as request } from 'supertest';
import { DataSource } from 'typeorm';

import { app } from '../../src/app';
import { DB } from '../../src/datasource';
import { Todo } from '../../src/datasource/entities/todo';

describe('create controller', () => {
  let dataSource: DataSource;
  beforeEach(async () => {
    dataSource = await DB.initialize();
  });

  it('creates a todo list when the create endpoint is called', async () => {
    const chance = new Chance();
    const mockTodo = {
      name: chance.sentence({ words: 20 }),
    };
    const response = await request(app).post('/api/todos').send(mockTodo);
    expect(response.status).toEqual(201);
    const body = response.body;
    expect(body.id).toBeDefined();
    const foundTodo = await dataSource.getRepository(Todo).findOne({
      where: { id: body.id },
    });
    expect(foundTodo).toBeDefined();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });
});
