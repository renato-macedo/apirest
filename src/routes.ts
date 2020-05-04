import express from 'express';
import AppntController from './Appointment/controller';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'world' });
});

routes.post('/appointments', AppntController.create);
routes.get('/appointments', AppntController.find);
routes.delete('/appointments', AppntController.remove);

export default routes;
