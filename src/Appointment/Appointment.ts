import { AppntTypes, AppntDTO, Appointment } from './types';

import { AppointmentSchema } from './validators/SchemaValidator';

import { DailyAppnt, DayAppnt, WeeklyAppnt } from './types';

export async function NewAppointment(data: AppntDTO): Promise<Appointment> {
  await AppointmentSchema.validateAsync(data);

  if (data.type === AppntTypes.WEEKLY) {
    return createWeeklyAppnt(data);
  }

  if (data.type === AppntTypes.DAY) {
    return createDayAppnt(data);
  }

  if (data.type === AppntTypes.DAILY) {
    return createDailyAppnt(data);
  }
  throw new Error('"type" must be one of [day, daily, weekly]');
}

function createDayAppnt(data: AppntDTO): DayAppnt {
  if (data.day) {
    return new DayAppnt(data.type, data.day, data.intervals);
  }

  throw new Error(
    'Cannot create one day appointment with missing day property'
  );
}

function createWeeklyAppnt(data: AppntDTO): WeeklyAppnt {
  if (data.weekdays && data.weekdays.length > 0) {
    const appnt = new WeeklyAppnt(data.type, data.intervals, data.weekdays);
    return appnt;
  }
  throw new Error('Cannot create weekly appointment without weekdays');
}

function createDailyAppnt(data: AppntDTO): DailyAppnt {
  return new DailyAppnt(data.type, data.intervals);
}
