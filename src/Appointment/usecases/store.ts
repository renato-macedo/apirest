import { Database } from '../../database';
import { Appointment } from '../types';

export async function store(appnt: Appointment): Promise<[any, any]> {
  const data = await Database.getStore().read();

  if (appnt.hasNoConflicts(data)) {
    data.push(appnt);

    try {
      await Database.getStore().write(data);
      return [false, appnt];
    } catch (error) {
      return [{ error: 'Could not save data' }, false];
    }
  } else {
    return [
      {
        error:
          'There are conflicts with this appointment, please change it and try again.',
      },
      false,
    ];
  }
}
