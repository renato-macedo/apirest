const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

// Object Schema Validator
const AppointmentSchema = Joi.object({
  type: Joi.string()
    .valid('day', 'daily', 'weekly')
    .required(),
  day: Joi.date()
    .format('DD-MM-YYYY')
    .raw(),
  intervals: Joi.array().items(
    Joi.object({
      start: Joi.string()
        .regex(/^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/)
        .required(),
      end: Joi.string()
        .regex(/^(?:([01]?\d|2[0-3]):([0-5]?\d))?$/)
        .required(),
    }).required()
  ),
  weekdays: Joi.array()
    .items(
      Joi.number()
        .greater(0)
        .less(7)
    )
    .max(7),
});

const IntervalSchema = Joi.object({
  startDate: Joi.date()
    .format('DD-MM-YYYY')
    .raw(),
  endDate: Joi.date()
    .format('DD-MM-YYYY')
    .raw(),
});

module.exports = {
  AppointmentSchema,
  IntervalSchema,
};
