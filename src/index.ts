import express from 'express';
import { AppDataSource } from './AppDataSource';
import routes from './routes';

//Ensures the app itinializes after the database is properly connected.
AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes);

  const port = process.env.APP_PORT || 3001;       // No need to import env beacuse it's been imported in AppDataSource module.
  return app.listen(port, () => {
    console.log(`App running on port ${ port }`);
  });
});
