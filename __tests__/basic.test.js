const request = require('supertest');
const app = require('../src/app');
describe('Routes', () => {
  it('should return 200 status code when POST /create ', async () => {
    const response = await request(app).post('/create');

    expect(response.status).toBe(200);
  });
});
