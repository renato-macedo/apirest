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
    const sameDayOrDayAfter = repository.filter((ap) => {
      if (ap.day) {
        if (this.day === ap.day) {
          return true;
        }
        return (
          isAfter(
            parse(ap.day, 'dd-MM-yyyy', new Date()),
            parse(this.day, 'dd-MM-yyyy', new Date())
          ) ||
          isSameDay(
            parse(ap.day, 'dd-MM-yyyy', new Date()),
            parse(this.day, 'dd-MM-yyyy', new Date())
          )
        );
      }

      if (ap.weekdays) {
        // check if there is some weekly appointment at the day
        return ap.weekdays.some((weekday: number) => {
          let appntWeekDay = getDay(parse(this.day, 'dd-MM-yyyy', new Date()));

          return appntWeekDay === weekday;
        });
      }
      // if the appnt is not type "day" the conflicts will be checked by the intervals
      return true;
    });

    if (sameDayOrDayAfter.length === 0) {
      return true;
    }

    // if there is a Appnt at same day or day after the conflicts will be checked by the intervals

    // verify if there is a Appnt with the same start time
    // this is O(3) 🙄
    let sameStartTime;
    for (const ap of sameDayOrDayAfter) {
      for (const interval of ap.intervals) {
        for (const i of this.intervals) {
          if (i.start === interval.start) {
            sameStartTime = ap;
          }
        }
      }
    }
    // this too 🙄
    // sameStartTime = sameDay.find((ap) => {
    //   return ap.intervals.some((interval) =>
    //     this.intervals.some((i) => interval.start === i.start)
    //   );
    // });

    if (sameStartTime) {
      return false;
    } else {
      return true;
    }
  }
}
