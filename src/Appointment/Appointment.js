const { AppointmentSchema, IntervalSchema } = require('./SchemaValidator');
const { hasNoConflicts, validInterval } = require('./Helpers');
const fs = require('fs');
const path = require('path');
const { getDay, parse, isAfter, isBefore } = require('date-fns');
const bdPath = path.resolve('bd.json');
const Appointment = {
  /* ----------------------------------- CRIAR REGRA ----------------------------------- */
  create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // validate the structure of the req.body object
        const value = await AppointmentSchema.validateAsync(data);
        console.log(value);
        const { intervals } = value;

        // verify if there is at least one invalid interval
        if (intervals.length > 0) {
          const hasSomeInvalidInterval = intervals.some(
            interval => validInterval(interval.start, interval.end) === false
          );
          if (hasSomeInvalidInterval) {
            resolve([
              { error: 'Interval must have valid start and end time' },
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
        if (err.isJoi) {
          const errMessages = err.details.map(err => err.message);
          resolve([{ error: errMessages }, false]);
        }
      }
    });
  },

  /* ----------------------------------- LISTAR TODAS ----------------------------------- */
  listAll() {
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

  /* ----------------------------------- REMOVER REGRA ----------------------------------- */
  async remove(data) {
    return new Promise(async resolve => {
      try {
        const value = await AppointmentSchema.validateAsync(data);
        const { intervals } = value;
        if (intervals.length > 0) {
          const hasSomeInvalidInterval = intervals.some(
            interval => validInterval(interval.start, interval.end) === false
          );
          if (hasSomeInvalidInterval) {
            resolve([
              { error: 'Interval must have valid start and end time' },
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
          const filteredByTypeAndStart = dataObject.data.filter(
            appnt =>
              appnt.type !== value.type ||
              appnt.intervals.some(
                interval =>
                  !value.intervals.some(a => interval.start === a.start)
              )
          );
          console.log('filtered', filteredByTypeAndStart);
          if (filteredByTypeAndStart.length === dataObject.data.length) {
            resolve([{ error: 'Could not find appointment' }, false]);
          } else {
            fs.writeFile(
              bdPath,
              JSON.stringify({ data: filteredByTypeAndStart }),
              err => {
                if (err) {
                  resolve([{ error: 'Could not save data' }, false]);
                }

                resolve([false, { success: true }]);
              }
            );
          }
        });
      } catch (error) {
        console.log(error.message);
        if (error.isJoi) {
          const errMessages = error.details.map(detail => detail.message);
          resolve([{ error: errMessages }, false]);
        }
      }
    });
  },

  /* ----------------------------------- LISTAR REGRAS EM UM INTERVALO ----------------------------------- */
  async getInterval(data) {
    return new Promise(async resolve => {
      try {
        const value = await IntervalSchema.validateAsync(data);
        const { startDate, endDate } = value;
        console.log(startDate);
        console.log(endDate);
        if (!validInterval(startDate, endDate, 'date')) {
          resolve([
            { error: 'Interval must have valid start and end date' },
            false,
          ]);
        }
        fs.readFile(bdPath, (err, data) => {
          console.log(data.toString());
          if (err) {
            resolve([{ error: 'Could not save data' }, false]);
          }
          const dataObject = JSON.parse(data.toString());
          const filtered = dataObject.data.filter(
            appnt =>
              appnt.type === 'daily' ||
              appnt.type === 'weekly' ||
              (isAfter(
                parse(appnt.day, 'dd-MM-yyyy', new Date()),
                parse(startDate, 'dd-MM-yyyy', new Date())
              ) &&
                isBefore(
                  parse(appnt.day, 'dd-MM-yyyy', new Date()),
                  parse(endDate, 'dd-MM-yyyy', new Date())
                ))
          );
          console.log('filtered', filtered);
          resolve([null, filtered]);
        });
      } catch (error) {
        console.log(error.message);
        if (err.isJoi) {
          const errMessages = err.details.map(detail => detail.message);
          resolve([{ error: errMessages }, false]);
        }
      }
    });
  },
};
module.exports = Appointment;
