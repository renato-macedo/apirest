const fs = require('fs');
const path = require('path');
const { getDay, parse } = require('date-fns');
const { dataset1, dataset2, dataset3 } = require('./datasets');
const {
  validateDaily,
  validateDay,
  validateWeekly,
} = require('../../src/Appointment/Helpers');
const bdPath = path.resolve('bd.test.json');

describe('Conflicts occurs when an  two appointments have the same day and a interval with the same same start time', () => {
  beforeEach(() => {
    fs.writeFileSync(bdPath, JSON.stringify({ data: [] }));
  });

  it('using dataset1, validateDay() should return false if input has the same day and the start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset1));

    const input = {
      type: 'day',
      day: '22-12-2019',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
    };

    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateDay(input, content)).toBe(false);
  });

  it('using dataset2, validateDaily() should return false if input has same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset2));

    const input = {
      type: 'daily',
      intervals: [{ start: '13:30', end: '15:00' }],
    };
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateDaily(input, content)).toBe(false);
  });

  it('using dataset2, validateWeekly() should return true if input has the same week day and same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset2));

    const input = {
      type: 'weekly',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekdays: [getDay(parse('23-12-2019', 'dd-MM-yyyy', new Date()))],
    };
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateWeekly(input, content)).toBe(true);
  });

  it('using dataset3, validateWeekly() should return false if input has the same week day and same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset3));

    const input = {
      type: 'weekly',
      intervals: [{ start: '09:40', end: '15:00' }],
      weekdays: [getDay(parse('23-12-2019', 'dd-MM-yyyy', new Date()))],
    };
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(validateWeekly(input, content)).toBe(false);
  });
});
