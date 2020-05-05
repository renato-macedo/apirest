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
          .message('invalid start time')
          .required(),
        end: Joi.string()
          .regex(/^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/)
          .message('invalid end time')
          .required(),
      }).required()
    )
    .required(),
  weekdays: Joi.array().items(Joi.number().greater(-1).less(7)).max(7),
});

/**
 * @description Interval schema only checks the format, not if the date is valid
 */
export const IntervalSchema = Joi.object({
  start: Joi.string()
    .regex(/(\d{2})-(\d{2})-(\d{4})/)
    .message('Invalid start date')
    .required(),
  end: Joi.string()
    .regex(/(\d{2})-(\d{2})-(\d{4})/)
    .message('Invalid end date')
    .required(),
});
