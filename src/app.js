const express = require('express');
const routes = require('./routes');
function app() {
  const app = express();
  app.use(express.json());
  app.use(routes);
  return app;
}

module.exports = app();
