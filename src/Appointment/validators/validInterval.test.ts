import { validInterval } from './validInterval';

describe('valid interval', () => {
  it('should return false if end is start is 22:30 e end is 12:10', () => {
    expect(validInterval({ start: '22:30', end: '12:10' })).toBe(false);
  });

  it('should return true if end is start is 11:30 e end is 17:10', () => {
    expect(validInterval({ start: '11:30', end: '17:10' })).toBe(true);
  });
});
