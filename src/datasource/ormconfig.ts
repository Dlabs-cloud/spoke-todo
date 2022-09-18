import config from 'config';
import { DataSourceOptions } from 'typeorm';

const datasourceConfig: DataSourceOptions = {
  type: 'postgres',
  name: 'default',
  host: config.get<string>('db.host'),
  port: config.get<number>('db.port'),
  username: config.get<string>('db.user'),
  password: config.get<string>('db.password'),
  database: config.get<string>('db.name'),
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
};

export = datasourceConfig;
