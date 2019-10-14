const { getDay, parse, isAfter, isSameDay, isFuture } = require('date-fns');

function validateDay(Appnt, content) {
  // search only on the days after
  const daysAfter = content.filter(
    ap =>
      ap.day &&
      (isAfter(
        parse(ap.day, 'dd-MM-yyyy', new Date()),
        parse(Appnt.day, 'dd-MM-yyyy', new Date())
      ) ||
        isSameDay(
          parse(ap.day, 'dd-MM-yyyy', new Date()),
          parse(Appnt.day, 'dd-MM-yyyy', new Date())
        ))
  );

  if (daysAfter.length === 0) {
    return true;
  }

  // verify if there is a Appnt at the same day
  const sameDay = content.filter(
    ap =>
      ap.day === Appnt.day ||
      ap.type === 'daily' ||
      ap.weekdays.some(
        weekday =>
          getDay(parse(Appnt.day, 'dd-MM-yyyy', new Date())) === weekday
      )
  );

  if (sameDay.length === 0) {
    return true;
  }

  // verify if there is a Appnt with the same start time
  const sameStartTime = sameDay.find(ap =>
    ap.intervals.some(interval =>
      Appnt.intervals.some(a => interval.start === a.start)
    )
  );
  if (sameStartTime) {
    return false;
  } else {
    return true;
  }
}

function validateDaily(Appnt, content) {
  const InTheFuture = content.filter(
    ap =>
      ap.type === 'daily' ||
      ap.type === 'weekly' ||
      isFuture(parse(ap.day, 'dd-MM-yyyy', new Date()))
  );
  if (InTheFuture.length === 0) {
    return true;
  }
  // checks if there is some day with the same start time
  const sameStartTime = InTheFuture.some(ap =>
    ap.intervals.some(interval =>
      Appnt.intervals.some(a => interval.start === a.start)
    )
  );

  if (sameStartTime) {
    return false;
  } else {
    return true;
  }
}

function validateWeekly(Appnt, content) {
  const InTheFuture = content.filter(
    ap =>
      ap.type === 'daily' ||
      ap.type === 'weekly' ||
      isFuture(parse(ap.day, 'dd-MM-yyyy', new Date()))
  );
  if (InTheFuture.length === 0) {
    return true;
  }
  const sameWeekDays = InTheFuture.filter(ap => {
    if (ap.type === 'day' || ap.type === 'weekly') {
      return ap.weekdays.some(weekday => Appnt.weekdays.includes(weekday));
    } else {
      return true;
    }
  });

  if (sameWeekDays.length === 0) {
    return true;
  }

  const sameStartTime = sameWeekDays.some(ap =>
    ap.intervals.some(interval =>
      Appnt.intervals.some(a => interval.start === a.start)
    )
  );

  if (sameStartTime) {
    return false;
  } else {
    return true;
  }
}

function validInterval(start, end) {
  if (
    isAfter(parse(end, 'HH:mm', new Date()), parse(start, 'HH:mm', new Date()))
  )
    return true;
  return false;
}

function hasNoConflicts(Appnt) {
  const { type } = Appnt;
  if (type === 'day') {
    return validateDate(Appnt);
  } else if (type === 'daily') {
    return validateDaily(Appnt);
  } else {
    return validateWeekly(Appnt);
  }
}

module.exports = {
  validateDay,
  validateDaily,
  validateWeekly,
  validInterval,
  hasNoConflicts,
};
