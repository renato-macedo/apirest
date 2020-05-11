import { dataset2 } from './datasets';
import { DailyAppnt } from '../src/Appointment/types';

describe('Conflicts occurs when two appointments have the same day and a interval with the same same start time', () => {
  it('using dataset2, hasNoConflicts() from DailyAppnt should return false if input has same start time', () => {
    const input = {
      type: 'daily',
      intervals: [{ start: '13:30', end: '15:00' }],
    };

    const appnt = new DailyAppnt(input.type, input.intervals);

    expect(appnt.hasNoConflicts(dataset2)).toBe(false);
  });
});
