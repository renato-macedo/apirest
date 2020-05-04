import { validInterval } from '../validators/validInterval';

export abstract class Appointment {
  readonly intervals: Interval[];
  readonly type: string;

  constructor(type: string, intervals: Interval[]) {
    // verify if there is at least one invalid interval
    if (intervals.length > 0) {
      const hasSomeInvalidInterval = intervals.some(
        (interval) => validInterval(interval, undefined) === false
      );
      if (hasSomeInvalidInterval) {
        throw new Error('Interval must have valid start and end time');
      }
    }
    this.type = type;
    this.intervals = intervals;
  }

  abstract hasNoConflicts(repository: any[]): boolean;
}

export enum AppntTypes {
  DAY = 'day',
  DAILY = 'daily',
  WEEKLY = 'weekly',
}

export type AppntDTO = {
  type: string;
  intervals: Interval[];
  day?: string;
  weekdays?: number[];
};

export interface Interval {
  start: string;
  end: string;
}
export interface iDayAppnt {
  type: string;
  intervals: Interval[];
  day: string;
}

export interface iWeeklyAppnt {
  type: string;
  intervals: Interval[];
  weekdays: number[];
}

export interface iDailyAppnt {
  type: string;
  intervals: Interval[];
}
