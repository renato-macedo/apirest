import { Database } from '../../database';
import { validInterval } from '../validators/validInterval';
import { Interval, Appointment, AppntDTO } from '../types';

// export async function remove(value: AppntDTO): Promise<[any, any]> {
//   const { intervals } = value;

//   if (intervals.length > 0) {
//     const hasSomeInvalidInterval = intervals.some(
//       (interval: Interval) => validInterval(interval) === false
//     );
//     if (hasSomeInvalidInterval) {
//       return [{ error: 'Interval must have valid start and end time' }, false];
//     }
//   }

//   const data = await Database.getStore().read();

//   const filteredByTypeAndStart = data.filter(
//     (appnt) =>
//       appnt.type !== value.type ||
//       appnt.intervals.some(
//         (interval) => !value.intervals.some((a) => interval.start === a.start)
//       )
//   );

//   /***
//    * @TODO Remove must be by id
//    */

//   if (filteredByTypeAndStart.length === data.length) {
//     return [{ error: 'Could not find appointment' }, false];
//   } else {
//     try {
//       Database.getStore().write(filteredByTypeAndStart);
//       return [false, { success: true }];
//     } catch (error) {
//       return [{ error: 'Could not save data' }, false];
//     }
//   }
// }

export async function remove(id: string) {
  let data: any[] = await Database.getStore().read();
  let appnt;

  data = data.filter((a) => {
    if (a.id == id) {
      appnt = a;
      return false;
    }
    return true;
  });
  await Database.getStore().write(data);
  return appnt;
}
