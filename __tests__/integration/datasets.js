const { getDay, parse } = require('date-fns');
const dataset1 = [
  {
    type: 'day',
    day: '21-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
  },
  {
    type: 'day',
    day: '22-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
  },
  {
    type: 'day',
    day: '23-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
  },
  {
    type: 'day',
    day: '24-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekday: getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date())),
  },
];

const dataset2 = [
  {
    type: 'daily',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
  },
  {
    type: 'daily',
    intervals: [
      { start: '10:30', end: '12:00' },
      { start: '13:30', end: '14:00' },
    ],
  },
];

module.exports = {
  dataset1,
  dataset2,
};
