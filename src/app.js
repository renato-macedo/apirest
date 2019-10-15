const express = require('express');
const routes = require('./routes');

function app() {
  const app = express();
  app.use(express.json());

  app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).send({ error: 'bad request' });
    } else next();
  });
  app.use(routes);
  return app;
}

module.exports = app();
