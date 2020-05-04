import { validInterval } from '../../src/Appointment/Helpers';

describe('valid interval', () => {
  it('should return false if end is start is 22:30 e end is 12:10', () => {
    expect(validInterval('22:30', '12:10')).toBe(false);
  });

  it('should return true if end is start is 11:30 e end is 17:10', () => {
    expect(validInterval('11:30', '17:10')).toBe(true);
  });
});
