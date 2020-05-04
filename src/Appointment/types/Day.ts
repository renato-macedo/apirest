import { getDay, parse, isAfter, isSameDay, isFuture } from 'date-fns';
import { Appointment, Interval, iDayAppnt } from './Appointment';

export class DayAppnt extends Appointment implements iDayAppnt {
  day: string;
  constructor(type: string, day: string, intervals: Interval[]) {
    super(type, intervals);
    this.day = day;
  }

  hasNoConflicts(repository: any[]) {
    // search only on the days after
    const daysAfter = repository.filter(
      (ap) =>
        ap.day &&
        (isAfter(
          parse(ap.day, 'dd-MM-yyyy', new Date()),
          parse(this.day, 'dd-MM-yyyy', new Date())
        ) ||
          isSameDay(
            parse(ap.day, 'dd-MM-yyyy', new Date()),
            parse(this.day, 'dd-MM-yyyy', new Date())
          ))
    );

    if (daysAfter.length === 0) {
      return true;
    }

    // verify if there is a Appnt at the same day
    const sameDay = repository.filter(
      (ap) =>
        ap.day === this.day ||
        ap.type === 'daily' ||
        ap.weekdays.some(
          (weekday) =>
            getDay(parse(this.day, 'dd-MM-yyyy', new Date())) === weekday
        )
    );

    if (sameDay.length === 0) {
      return true;
    }

    // verify if there is a Appnt with the same start time
    const sameStartTime = sameDay.find((ap) =>
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
