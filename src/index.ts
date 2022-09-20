import 'reflect-metadata';
import config from 'config';

import { app } from './app';
import { DB } from './datasource';

const start = (app) => {
  const port = config.get('port');
  try {
    DB.initialize()
      .then(() => {
        console.log('DB started successfully');
        return Promise.resolve();
      })
      .then((_) => {
        return app.listen(port, () => {
          console.log(`Api running at http://localhost:${port}`);
        });
      });
  } catch (err) {
    console.error(err);
    // process.exit();
  }
};

start(app);
