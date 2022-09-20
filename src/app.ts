import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware';
import routes from './routes';
import notFoundErrorPage from './routes/not-found-error';

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(errorHandler);
