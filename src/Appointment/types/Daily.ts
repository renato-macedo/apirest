import { getDay, parse, isAfter, isSameDay, isFuture } from 'date-fns';
import { Appointment, Interval, iDailyAppnt } from './Appointment';

export class DailyAppnt extends Appointment implements iDailyAppnt {
  constructor(type: string, intervals: Interval[]) {
    super(type, intervals);
  }

  hasNoConflicts(repository: any[]) {
    const InTheFuture = repository.filter(
      (ap) =>
        ap.type === 'daily' ||
        ap.type === 'weekly' ||
        isFuture(parse(ap.day, 'dd-MM-yyyy', new Date()))
    );
    if (InTheFuture.length === 0) {
      return true;
    }
    // checks if there is some day with the same start time
    const sameStartTime = InTheFuture.some((ap) =>
      ap.intervals.some((interval) =>
        this.intervals.some((a) => interval.start === a.start)
      )
    );
    return !sameStartTime;
  }
}
