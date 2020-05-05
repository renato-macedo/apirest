import { Request, Response } from 'express';
import AppntService from './service';

import {
  AppointmentSchema,
  IntervalSchema,
} from './validators/SchemaValidator';

import { NewAppointment } from './Appointment';

const Controller = {
  async create(req: Request, res: Response) {
    try {
      const data = await NewAppointment(req.body);

      const [error, appnt] = await AppntService.store(data);

      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(appnt);
      }
    } catch (error) {
      console.log(error.message);
      if (error.isJoi) {
        const errMessages = error.details.map((detail) => detail.message);

        return res.status(400).json({ error: errMessages });
      }
      res.status(400).json({ error: error.message });
    }
  },

  async find(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      if (startDate && endDate) {
        const interval = await parseQuery(req.query);
        const [error, appnt] = await AppntService.getInterval(interval);
        if (error) {
          return res.status(400).json(error);
        } else {
          return res.status(200).json(appnt);
        }
      } else {
        const appnt = await AppntService.listAll();
        return res.status(200).json(appnt);
      }
    } catch (error) {
      console.log(error.message);
      if (error.isJoi) {
        const errMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ error: errMessages });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      // await AppointmentSchema.validateAsync(req.body);
      const appnt = await AppntService.remove(req.params.id);
      if (appnt) {
        return res.status(200).json({
          message: `remove appointment ${req.params.id} successfully`,
        });
      }
      return res
        .status(400)
        .json({ error: 'could not find appointment with the given id' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'server error' });
    }
  },
};

async function parseQuery(query: any): Promise<{ start: string; end: string }> {
  let { startDate, endDate } = query;
  if (Array.isArray(startDate)) {
    startDate = startDate[0];
  }

  if (Array.isArray(endDate)) {
    endDate = endDate[0];
  }
  const interval = { start: startDate, end: endDate };
  await IntervalSchema.validateAsync(interval);
  return interval;
}

export default Controller;
