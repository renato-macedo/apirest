import { WeeklyAppnt } from '../src/Appointment/types';

import { dataset3 } from './datasets';

describe('Conflicts occurs when two appointments have the same day and a interval with the same same start time', () => {
  it('using dataset3, hasNoConflicts() from WeeklyAppnt should return false if input has the same week day and same start time', () => {
    const input = {
      type: 'weekly',
      intervals: [{ start: '09:40', end: '15:00' }],
      weekdays: [1, 3],
    };

    const appnt = new WeeklyAppnt(input.type, input.intervals, input.weekdays);

    expect(appnt.hasNoConflicts(dataset3)).toBe(false);
  });
});
