import { AppointmentSchema, IntervalSchema } from './SchemaValidator';

it('should throw when start date is not in format DD-MM-YYYY', async () => {
  await expect(
    IntervalSchema.validateAsync({
      start: '022-222-2223',
      end: '22-22-1999',
    })
  ).rejects.toThrow();
});

it('should throw when end date is not in format DD-MM-YYYY', async () => {
  await expect(
    IntervalSchema.validateAsync({
      start: '22-22-1999',
      end: '022-222-2223',
    })
  ).rejects.toThrow();
});
