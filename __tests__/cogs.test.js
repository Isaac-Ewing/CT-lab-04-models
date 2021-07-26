import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import requireFromString from 'require-from-string';

describe('cog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get cogs', async () => {
    const res = await requireFromString(app)
      .post('api/v1/cogs')
      .send({ function: 'ship', firstUse: '10th century' });

    expect(res.body).toEqual({
      function: 'ship', 
      firstUse: '10th century'
    });
  });
});
