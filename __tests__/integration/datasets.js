/* 
With these datasets, I tried to simulate the different 
states of the "database" since im not not allowed to use one.
But I'll not write tests for every combination(dataset X example).
*/

const { getDay, parse } = require('date-fns');
const dataset1 = [
  {
    type: 'day',
    day: '21-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
  },
  {
    type: 'day',
    day: '22-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
  },
  {
    type: 'day',
    day: '23-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
  },
  {
    type: 'day',
    day: '24-12-2019',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
    weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
  },
];

const dataset2 = [
  {
    type: 'daily',
    intervals: [
      { start: '6:30', end: '15:00' },
      { start: '13:40', end: '15:00' },
    ],
  },
  {
    type: 'daily',
    intervals: [
      { start: '10:30', end: '12:00' },
      { start: '13:30', end: '14:00' },
    ],
  },
  {
    type: 'day',
    day: '24-12-2019',
    intervals: [
      { start: '14:30', end: '17:00' },
      { start: '09:30', end: '10:00' },
    ],
    weekdays: [getDay(parse('24-12-2019', 'dd-MM-yyyy', new Date()))],
  },
  {
    type: 'day',
    day: '25-12-2019',
    intervals: [
      { start: '10:40', end: '12:00' },
      { start: '09:40', end: '10:00' },
    ],
    weekdays: [getDay(parse('25-12-2019', 'dd-MM-yyyy', new Date()))],
  },
];

const dataset3 = [
  {
    type: 'weekly',
    intervals: [
      { start: '06:30', end: '15:00' },
      { start: '15:30', end: '16:00' },
    ],
    weekdays: [1, 3],
  },
  {
    type: 'weekly',
    intervals: [
      { start: '13:30', end: '15:00' },
      { start: '15:40', end: '16:00' },
    ],
    weekdays: [2, 4],
  },
  {
    type: 'day',
    day: '23-12-2019',
    intervals: [
      { start: '10:40', end: '12:00' },
      { start: '09:40', end: '10:00' },
    ],
    weekdays: [getDay(parse('23-12-2019', 'dd-MM-yyyy', new Date()))],
  },
  {
    type: 'daily',
    intervals: [
      { start: '7:30', end: '11:00' },
      { start: '08:40', end: '10:00' },
    ],
  },
];

module.exports = {
  dataset1,
  dataset2,
  dataset3,
};
