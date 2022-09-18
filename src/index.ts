import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { DB } from './datasource';
import routes from './routes';

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port`, port);
});
(async () => {
  await DB.initialize().then(() => {
    console.log('Data base started gracefully!!');
  });
})();
