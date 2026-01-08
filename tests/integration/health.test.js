const request = require('supertest');
const app = require('../../src/app');

describe('Integration Tests: Health Check', () => {

  describe('GET /health', () => {
    it('should return 200 OK and status UP', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'UP');
      expect(res.headers['content-type']).toMatch(/json/);
    });
  });
});