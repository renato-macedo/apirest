const schema = require('./SchemaValidator');
const { hasNoConflicts, validInterval } = require('./Helpers');
const fs = require('fs');
const path = require('path');
const { getDay, parse } = require('date-fns');
const bdPath = path.resolve('bd.json');
console.log(bdPath);
const Appointment = {
  async create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // validate the structure of the req.body object
        const value = await schema.validateAsync(data);
        console.log(value);
        const { intervals } = value;

        // verify if there is at least one invalid interval
        if (intervals.length > 0) {
          const invalid = intervals.some(
            interval => validInterval(interval.start, interval.end) === false
          );
          if (invalid) {
            resolve([
              { error: 'Interval must valid start and end time' },
              false,
            ]);
          }
        }
        fs.readFile(bdPath, (err, data) => {
          console.log(data.toString());
          if (err) {
            resolve([{ error: 'Could not save data' }, false]);
          }
          const dataObject = JSON.parse(data.toString());
          if (hasNoConflicts(value, dataObject.data)) {
            if (value.type === 'day') {
              value.weekdays = [
                getDay(parse(value.day, 'dd-MM-yyyy', new Date())),
              ];
            }
            dataObject.data.push(value);
            fs.writeFile(bdPath, JSON.stringify(dataObject), err => {
              if (err) {
                resolve([{ error: 'Could not save data' }, false]);
              }

              resolve([false, { success: true }]);
            });
          } else {
            resolve([
              {
                error:
                  'There are conflicts with this appointment, please change it and try again.',
              },
              false,
            ]);
          }
        });
      } catch (err) {
        console.log(err.message);
        if (err.isJoi) {
          const errMessages = err.details.map(err => err.message);
          resolve([{ error: errMessages }, false]);
        }
      }
    });
  },

  async listAll() {
    return new Promise(resolve => {
      fs.readFile(bdPath, (err, data) => {
        if (err) {
          resolve([{ error: 'Could get data, try again later' }, false]);
        }
        const dataObject = JSON.parse(data.toString());
        resolve([null, dataObject.data]);
      });
    });
  },
};
module.exports = Appointment;
