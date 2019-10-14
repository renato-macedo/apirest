const Joi = require('@hapi/joi');

// Object Schema Validator
const schema = Joi.object({
  type: Joi.string()
    .valid('day', 'daily', 'weekly')
    .required(),
  day: Joi.string().isoDate(),
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

module.exports = schema;
