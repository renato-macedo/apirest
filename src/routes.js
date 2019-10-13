const express = require('express');
const routes = express.Router();
const AppntController = require('./Appointment/controller');

routes.get('/', (req, res) => {
  return res.json({ hello: 'fucking world' });
});

routes.post('/create', AppntController.create);

module.exports = routes;
