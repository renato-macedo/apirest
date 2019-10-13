const schema = require('../../src/Appointment/SchemaValidator');
const Joi = require('@hapi/joi');

describe('schema validator', () => {
  it('should throw error when type is not provided', async () => {
    const example = {
      type: 1,
    };
    const t = async () => await schema.validateAsync(example);
    expect(t).toThrow(TypeError);
  });
});
