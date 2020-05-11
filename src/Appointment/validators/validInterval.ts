import { parse, isAfter } from 'date-fns';

import { Interval } from '../types';

export function validInterval(interval: Interval, format?: string) {
  const { start, end } = interval;
  if (format === 'date') {
    format = 'dd-MM-yyyy';
  } else {
    format = 'HH:mm';
  }

  return isAfter(
    parse(end, format, new Date()),
    parse(start, format, new Date())
  );
}

export function hasDuplicateIntervals(intervals: Interval[]): boolean {
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (intervals[i].start === intervals[j].start) {
        return true;
      }
    }
  }
  return false;
}
