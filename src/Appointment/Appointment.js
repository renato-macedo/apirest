const schema = require('./SchemaValidator');
const { hasNoConflicts, validInterval } = require('./Helpers');

const Appointment = {
  async create(data) {
    try {
      // validate the structure of the req.body object
      const value = await schema.validateAsync(data);

      const { intervals } = value;

      // verify if there is at least one invalid interval
      if (intervals.length > 0) {
        const invalid = intervals.some(
          interval => validInterval(interval.start, interval.end) === false
        );
        if (invalid) {
          return [{ error: 'Interval must valid start and end time' }, false];
        }
      }

      if (hasNoConflicts(value)) {
        // store(value, 'whare');
      }
      return [false, { ok: true }];
    } catch (err) {
      if (err.isJoi) {
        const errMessages = err.details.map(err => err.message);
        return [{ error: errMessages }, false];
      }
    }
  },
};

// function store(appnt, filepath) {
//   const { date, intervals } = appnt;
// }
module.exports = Appointment;
