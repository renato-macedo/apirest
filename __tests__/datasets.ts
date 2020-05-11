/* 
With these datasets, I tried to simulate the different 
states of the "database" since im not not allowed to use one.
I'm not sure if it's the correct approach.
*/
import { getDay, parse } from 'date-fns';

// tested in day_conflicts.test.ts
export const dataset1 = [
  {
    type: 'day',
    day: '12-05-2020',
    intervals: [
      { start: '14:30', end: '15:00' },
      { start: '15:30', end: '15:00' },
    ],
  },
  {
    type: 'weekly',
    intervals: [
      { start: '06:30', end: '15:00' },
      { start: '13:30', end: '16:00' },
    ],
    weekdays: [1, 3],
  },
  {
    type: 'daily',
    intervals: [
      { start: '7:30', end: '11:00' },
      { start: '08:40', end: '10:00' },
    ],
  },
];

// tested in daily_conflicts.test.ts
export const dataset2 = [
  {
    type: 'daily',
    intervals: [
      { start: '6:30', end: '15:00' },
      { start: '13:40', end: '15:00' },
    ],
  },
  {
    type: 'weekly',
    intervals: [
      { start: '10:30', end: '12:00' },
      { start: '13:30', end: '14:00' },
    ],
    weekdays: [2, 4],
  },
  {
    type: 'day',
    day: '23-12-2019',
    intervals: [
      { start: '14:30', end: '17:00' },
      { start: '09:30', end: '10:00' },
    ],
  },
];

// tested in weekly_conflicts.test.ts
export const dataset3 = [
  // same start time but no weekday
  {
    type: 'weekly',
    intervals: [
      { start: '09:40', end: '15:00' },
      { start: '15:40', end: '16:00' },
    ],
    weekdays: [2, 4],
  },
  // the date is the same weekday and start time - conflict
  {
    type: 'day',
    day: '13-05-2020',
    intervals: [
      { start: '10:40', end: '12:00' },
      { start: '09:40', end: '11:00' },
    ],
  },
  // same weekday but no start time
  {
    type: 'daily',
    intervals: [
      { start: '7:30', end: '11:00' },
      { start: '08:40', end: '10:00' },
    ],
  },
];

// should be stored in the test database
export const dataset4 = [
  {
    type: 'daily',
    intervals: [
      {
        start: '6:30',
        end: '15:00',
      },
      {
        start: '13:40',
        end: '15:00',
      },
    ],
  },
  {
    type: 'daily',
    intervals: [
      {
        start: '10:30',
        end: '12:00',
      },
      {
        start: '13:30',
        end: '14:00',
      },
    ],
  },
  {
    type: 'day',
    day: '23-12-2019',
    intervals: [
      {
        start: '14:30',
        end: '17:00',
      },
      {
        start: '09:30',
        end: '10:00',
      },
    ],
  },
];
