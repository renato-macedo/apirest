import { getDay, parse, isAfter, isSameDay, isFuture } from 'date-fns';
import { Appointment, Interval, iWeeklyAppnt } from './Appointment';

export class WeeklyAppnt extends Appointment implements iWeeklyAppnt {
  readonly weekdays: number[];

  constructor(type: string, intervals: Interval[], weekdays: number[]) {
    super(type, intervals);
    this.weekdays = weekdays;
  }

  hasNoConflicts(repo: any[]): boolean {
    const InTheFuture = repo.filter(
      (ap) =>
        ap.type === 'daily' ||
        ap.type === 'weekly' ||
        isFuture(parse(ap.day, 'dd-MM-yyyy', new Date()))
    );

    if (InTheFuture.length === 0) {
      return true;
    }

    const sameWeekDays = InTheFuture.filter((ap) => {
      if (ap.type === 'weekly') {
        return ap.weekdays.some((weekday) => this.weekdays.includes(weekday));
      }

      if (ap.type === 'day') {
        console.log(ap);
        let day = getDay(parse(ap.day, 'dd-MM-yyyy', new Date()));

        return this.weekdays.includes(day);
      }

      // daily
      return true;
    });

    if (sameWeekDays.length === 0) {
      return true;
    }

    for (const ap of sameWeekDays) {
      for (const interval of ap.intervals) {
        for (const i of this.intervals) {
          if (i.start === interval.start) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
