const fs = require('fs');
const path = require('path');
const { getDay, parse } = require('date-fns');
const { dataset1, dataset2 } = require('./datasets');
const {
  validateDaily,
  validateDay,
  validateWeekly,
} = require('../../src/Appointment/Helpers');
const bdPath = path.resolve('..', 'bd.test.json');

describe('Conflicts occurs when an  two appointments have the same day and a interval with the same same start time', () => {
  beforeEach(() => {
    fs.writeFileSync(bdPath, JSON.stringify([]));
  });

  it('validateDay should return false if example has the same day and the start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset1));

    const example = {
      type: 'day',
      day: '22-12-2019',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
    };

    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateDay(example, content)).toBe(false);
  });

  it('validateDaily should return return false if example has same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset2));

    const example = {
      type: 'day',
      day: '22-12-2019',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
    };
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateDaily(example, content)).toBe(false);
  });
});
