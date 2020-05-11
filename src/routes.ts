import express from 'express';
import AppntController from './Appointment/controller';

const routes = express.Router();

routes.post('/appointments', AppntController.create);
routes.get('/appointments', AppntController.find);
routes.delete('/appointments/:id', AppntController.remove);

routes.all('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

export default routes;
