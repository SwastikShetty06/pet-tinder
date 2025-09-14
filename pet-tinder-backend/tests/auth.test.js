const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Auth Endpoints', () => {
  it('should return 401 on login with empty body', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});
    expect(res.statusCode).toEqual(401);
  });
});
