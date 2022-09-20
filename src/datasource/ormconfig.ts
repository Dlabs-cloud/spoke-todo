import config from 'config';
import { DataSourceOptions } from 'typeorm';

import { Todo } from './entities/todo';

const datasourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv == 'test') {
    return {
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [Todo],
      dropSchema: true,
    };
  }
  return {
    type: 'postgres',
    name: 'default',
    host: config.get<string>('db.host'),
    port: config.get<number>('db.port'),
    username: config.get<string>('db.user'),
    password: config.get<string>('db.password'),
    database: config.get<string>('db.name'),
    synchronize: true,
    logging: true,
    ssl: nodeEnv === 'development' ? false : { rejectUnauthorized: false },
    entities: [Todo],
  };
};

export = datasourceConfig;
