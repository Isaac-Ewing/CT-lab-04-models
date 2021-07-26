import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('bog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('bogs', async () => {
    const res = await request(app)
      .post('/api/v1/bogs')
      .send({ type: 'Valley bog', climate: 'dry', substrate: 'acidic' });

    expect(res.body).toEqual({
      id: '1',
      type: 'Valley bog', 
      climate: 'dry', 
      substrate: 'acidic'
    });
  });
});
