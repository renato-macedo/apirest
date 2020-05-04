import express, { ErrorRequestHandler } from 'express';
import routes from './routes';

function NewApp() {
  const app = express();
  app.use(express.json());

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).send({ error: 'Invalid body' });
    } else next();
  });

  app.use(routes);
  return app;
}

export default NewApp();
