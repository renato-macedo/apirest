import Joi from '@hapi/joi';

// Object Schema Validator
export const AppointmentSchema = Joi.object({
  type: Joi.string().valid('day', 'daily', 'weekly').required(),
  day: Joi.string().regex(/(\d{2})-(\d{2})-(\d{4})/),
  intervals: Joi.array()
    .items(
      Joi.object({
        start: Joi.string()
          .regex(/^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/)
          .required(),
        end: Joi.string()
          .regex(/^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/)
          .required(),
      }).required()
    )
    .required(),
  weekdays: Joi.array().items(Joi.number().greater(0).less(7)).max(7),
});

export const IntervalSchema = Joi.object({
  startDate: Joi.string().regex(/(\d{2})-(\d{2})-(\d{4})/),
  endDate: Joi.string().regex(/(\d{2})-(\d{2})-(\d{4})/),
});
