import { getDay, parse, isAfter, isSameDay, isFuture } from 'date-fns';
import { Appointment, Interval, iWeeklyAppnt } from './Appointment';

export class WeeklyAppnt extends Appointment implements iWeeklyAppnt {
  readonly weekdays: number[];

  constructor(type: string, intervals: Interval[], weekdays: number[]) {
    super(type, intervals);
    this.weekdays = weekdays;
  }

  hasNoConflicts(repo: any[]) {
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
      if (ap.type === 'day' || ap.type === 'weekly') {
        return ap.weekdays.some((weekday) => this.weekdays.includes(weekday));
      } else {
        return true;
      }
    });

    if (sameWeekDays.length === 0) {
      return true;
    }

    const sameStartTime = sameWeekDays.some((ap) =>
      ap.intervals.some((interval) =>
        this.intervals.some((a) => interval.start === a.start)
      )
    );

    if (sameStartTime) {
      return false;
    } else {
      return true;
    }
  }
}
