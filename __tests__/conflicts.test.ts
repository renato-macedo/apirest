import fs from 'fs';

import path from 'path';

import { getDay, parse } from 'date-fns';

import { dataset1, dataset2, dataset3 } from './datasets';
import { DayAppnt, DailyAppnt, WeeklyAppnt } from '../src/Appointment/types';

const bdPath = path.resolve('./src/database/bd.test.json');

describe('Conflicts occurs when an two appointments have the same day and a interval with the same same start time', () => {
  beforeEach(() => {
    fs.writeFileSync(bdPath, JSON.stringify({ data: [] }));
  });

  it('using dataset1, hasNoConflicts() from DayAppnt should return false if input has the same day and the start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset1));

    const input = {
      type: 'day',
      day: '22-12-2019',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekdays: [getDay(parse('22-12-2019', 'dd-MM-yyyy', new Date()))],
    };

    const appnt = new DayAppnt(input.type, input.day, input.intervals);

    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(appnt.hasNoConflicts(content)).toBe(false);
  });

  it('using dataset2, hasNoConflicts() from DailyAppnt should return false if input has same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset2));

    const input = {
      type: 'daily',
      intervals: [{ start: '13:30', end: '15:00' }],
    };

    const appnt = new DailyAppnt(input.type, input.intervals);
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(appnt.hasNoConflicts(content)).toBe(false);
  });

  it('using dataset2, hasNoConflicts() from WeeklyAppnt should return true if input has the same week day and same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset2));

    const input = {
      type: 'weekly',
      intervals: [{ start: '14:30', end: '15:00' }],
      weekdays: [getDay(parse('23-12-2019', 'dd-MM-yyyy', new Date()))],
    };
    const appnt = new WeeklyAppnt(input.type, input.intervals, input.weekdays);
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(appnt.hasNoConflicts(content)).toBe(true);
  });

  it('using dataset3, hasNoConflicts() from WeeklyAppnt should return false if input has the same week day and same start time', () => {
    fs.writeFileSync(bdPath, JSON.stringify(dataset3));

    const input = {
      type: 'weekly',
      intervals: [{ start: '09:40', end: '15:00' }],
      weekdays: [getDay(parse('23-12-2019', 'dd-MM-yyyy', new Date()))],
    };

    const appnt = new WeeklyAppnt(input.type, input.intervals, input.weekdays);
    const content = JSON.parse(fs.readFileSync(bdPath).toString());

    expect(appnt.hasNoConflicts(content)).toBe(false);
  });
});
