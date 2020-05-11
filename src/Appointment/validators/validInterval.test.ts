import { validInterval, hasDuplicateIntervals } from './validInterval';
import { Interval } from '../types';

describe('valid interval', () => {
  it('should return false if end is start is 22:30 e end is 12:10', () => {
    expect(validInterval({ start: '22:30', end: '12:10' })).toBe(false);
  });

  it('should return true if end is start is 11:30 e end is 17:10', () => {
    expect(validInterval({ start: '11:30', end: '17:10' })).toBe(true);
  });
});

describe('duplicate intervals', () => {
  it('should return true if the are two intervals with the same start time', () => {
    const intervals: Interval[] = [
      { start: '17:40', end: '20:00' },
      { start: '12:40', end: '20:00' },
      { start: '15:40', end: '20:00' },
      { start: '16:40', end: '20:00' },
      { start: '17:40', end: '20:00' },
    ];

    expect(hasDuplicateIntervals(intervals)).toBe(true);
  });
  it('should return false if the all intervals has different start times', () => {
    const intervals: Interval[] = [
      { start: '17:40', end: '20:00' },
      { start: '12:40', end: '20:00' },
      { start: '15:40', end: '20:00' },
      { start: '16:40', end: '20:00' },
      { start: '18:40', end: '20:00' },
    ];

    expect(hasDuplicateIntervals(intervals)).toBe(false);
  });
});
