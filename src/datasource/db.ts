import { DataSource } from 'typeorm';

import datasourceConfig from './ormconfig';

export const DB = new DataSource(datasourceConfig());
