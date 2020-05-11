import request from 'supertest';
import fs from 'fs';

import path from 'path';
import app from '../src/app';
import { dataset4 } from './datasets';
import { Database } from '../src/database';
const bdPath = path.resolve('./src/database/db.test.json');

describe('when POST /appointments', () => {
  beforeEach(() => {
    Database.connect();
  });

  afterEach(() => {
    fs.writeFileSync(bdPath, JSON.stringify([]));
  });
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

  test('all items from dataset4 should be stored with no problems', async () => {
    const application = request(app);

    const responses = await Promise.all(
      dataset4.map((item) => {
        return application.post('/appointments').send(item);
      })
    );

    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });
  });
});
