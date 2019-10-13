const express = require('express');
const routes = express.Router();
const Appointment = require('./Appointment');

routes.get('/', (req, res) => {
  return res.json({ hello: 'fucking world' });
});

routes.post('/create', Appointment.create);

module.exports = routes;
