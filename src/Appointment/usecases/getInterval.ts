import { parse, isAfter, isBefore } from 'date-fns';
import { validInterval } from '../validators/validInterval';
import { Database } from '../../database';
import { Interval } from '../types';

export async function getInterval(interval: Interval) {
  if (!validInterval(interval, 'date')) {
    return [{ error: 'Interval must have valid start and end date' }, false];
  }

  const data = await Database.getStore().read();
  const filtered = data.filter(
    (appnt: any) =>
      appnt.type === 'daily' ||
      appnt.type === 'weekly' ||
      (isAfter(
        parse(appnt.day, 'dd-MM-yyyy', new Date()),
        parse(interval.start, 'dd-MM-yyyy', new Date())
      ) &&
        isBefore(
          parse(appnt.day, 'dd-MM-yyyy', new Date()),
          parse(interval.end, 'dd-MM-yyyy', new Date())
        ))
  );
  return [null, filtered];
}
