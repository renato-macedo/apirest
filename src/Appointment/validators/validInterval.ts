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
