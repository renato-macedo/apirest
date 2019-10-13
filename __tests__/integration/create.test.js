const request = require('supertest');
const app = require('../../src/app');

describe('when POST /create', () => {
  it('should return 400 status code if type is not in the request body ', async () => {
    const response = await request(app).post('/create');

    expect(response.status).toBe(400);
  });
  it('should return 400 status code if type is not day, daily or weekly', async () => {
    const response = await request(app)
      .post('/create')
      .send({ type: 'monthly' });

    expect(response.status).toBe(400);
  });
  it('should return 400 status code if the provided days is not a valid week day', async () => {
    const response = await request(app)
      .post('/create')
      .send({
        type: 'weekly',
        intervals: [
          { start: '14:30', end: '15:00' },
          { start: '15:10', end: '15:30' },
        ],
        days: [1, 9],
      });

    expect(response.status).toBe(400);
  });
});
