const { getDay, parse, isAfter, isSameDay, isFuture } = require('date-fns');

function validateDay(appnt, content) {
  // search only on the days after
  const daysAfter = content.filter(
    ap =>
      ap.day &&
      (isAfter(
        parse(ap.day, 'dd-MM-yyyy', new Date()),
        parse(appnt.day, 'dd-MM-yyyy', new Date())
      ) ||
        isSameDay(
          parse(ap.day, 'dd-MM-yyyy', new Date()),
          parse(appnt.day, 'dd-MM-yyyy', new Date())
        ))
  );

  if (daysAfter.length === 0) {
    return true;
  }

  // verify if there is a appnt at the same day
  const sameDay = content.filter(
    ap =>
      ap.day === appnt.day ||
      ap.type === 'daily' ||
      getDay(parse(appnt.day, 'dd-MM-yyyy', new Date())) === ap.weekday
  );

  if (sameDay.length === 0) {
    return true;
  }

  // verify if there is a appnt with the same start time
  const sameStart = sameDay.filter(ap =>
    ap.intervals.some(interval =>
      appnt.intervals.find(a => interval.start === a.start)
    )
  );
  if (sameStart.length === 0) {
    return true;
  }

  return false;
}

function validateDaily(appnt, content) {
  const InTheFuture = content.filter(
    ap =>
      ap.type === 'daily' || isFuture(parse(ap.day, 'dd-MM-yyyy', new Date()))
  );

  // checks if there is some day with the same start time
  const sameStart = content.filter(ap =>
    ap.intervals.some(interval =>
      appnt.intervals.find(a => interval.start === a.start)
    )
  );
}

function validateWeekly(appnt) {
  // get every the
}

function validInterval(start, end) {
  if (
    isAfter(parse(end, 'HH:mm', new Date()), parse(start, 'HH:mm', new Date()))
  )
    return true;
  return false;
}

function hasNoConflicts(appnt) {
  const { type } = appnt;
  if (type === 'day') {
    return validateDate(appnt);
  } else if (type === 'daily') {
    return validateDaily(appnt);
  } else {
    return validateWeekly(appnt);
  }
}

module.exports = {
  validateDay,
  validateDaily,
  validateWeekly,
  validInterval,
  hasNoConflicts,
};
