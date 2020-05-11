import { dataset1 } from './datasets';
import { DayAppnt } from '../src/Appointment/types';

describe('Conflicts occurs when two appointments have the same day and a interval with the same same start time', () => {
  test('using dataset1, hasNoConflicts() should return false if there is a Day Appointment with the same day and start time as the input', () => {
    const input = {
      type: 'day',
      day: '12-05-2020',
      intervals: [{ start: '14:30', end: '15:00' }],
    };

    const appnt = new DayAppnt(input.type, input.day, input.intervals);

    expect(appnt.hasNoConflicts(dataset1)).toBe(false);
  });

  test('using dataset1, hasNoConflicts() should return false if there is a Weekly Appointment with the same start time as the input', () => {
    const input = {
      type: 'day',
      day: '13-05-2020',
      intervals: [{ start: '06:30', end: '10:00' }],
    };

    const appnt = new DayAppnt(input.type, input.day, input.intervals);

    expect(appnt.hasNoConflicts(dataset1)).toBe(false);
  });

  test('using dataset1, hasNoConflicts() should return false if there is a Daily Appointment with the same start time as the input', () => {
    const input = {
      type: 'day',
      day: '13-05-2020',
      intervals: [{ start: '08:40', end: '10:00' }],
    };

    const appnt = new DayAppnt(input.type, input.day, input.intervals);

    expect(appnt.hasNoConflicts(dataset1)).toBe(false);
  });
});
