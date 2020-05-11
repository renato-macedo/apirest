import express, { ErrorRequestHandler } from 'express';
import routes from './routes';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).send({ error: 'Invalid body' });
  } else next();
};

function NewApp() {
  const app = express();
  app.use(express.static('public'));
  app.use(express.json());

  app.use(errorHandler);

  app.use(routes);
  return app;
}

export default NewApp();
