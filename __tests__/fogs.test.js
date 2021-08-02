import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('fog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('send to fog', async () => {
    const res = await request(app)
      .post('/api/v1/fogs')
      .send({ id: '1', type: 'radiation fog', formedby: 'heat transfer' });

    expect(res.body).toEqual({
      id: '1',
      type: 'radiation fog',
      formedby: 'heat transfer'
    });
  });
});
