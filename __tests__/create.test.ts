const request = require('supertest');
const app = require('../../src/app');

describe('when POST /appointments', () => {
  it('should return status code 400 if type is not in the request body ', async () => {
    const response = await request(app).post('/appointments');

    expect(response.status).toBe(400);
  });
  it('should return status code 400 if type is not day, daily or weekly', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({ type: 'monthly' });

    expect(response.status).toBe(400);
  });
  it('should return status code 400 if the provided days is not a valid week day', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({
        type: 'weekly',
        intervals: [
          { start: '14:30', end: '15:00' },
          { start: '15:10', end: '15:30' },
        ],
        weekdays: [1, 9],
      });

    expect(response.status).toBe(400);
  });

  it('should return 200 ');
});
