import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Bog from '../lib/models/Bog.js';

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

  it('gets a bog by id', async () => {
    const bog = await Bog.insert({
      type: 'raised',
      climate: 'wet',
      substrate: 'acidic/non-acidic'
    });
    const res = await request(app)
      .get(`/api/v1/bogs/${bog.id}`);
    
    expect(res.body).toEqual(bog);
  });

  it('gets all bogs using GET', async () => {
    const bog1 = await Bog.insert({
      type: 'Valley bog', 
      climate: 'dry', 
      substrate: 'acidic'
    });
    const bog2 = await Bog.insert({
      type: 'raised',
      climate: 'wet',
      substrate: 'acidic/non-acidic'
    });
    const res = await request(app)
      .get('/api/v1/bogs/');
      

    expect(res.body).toEqual([bog1, bog2]);
  });

  it('updates a bog by id using PUT', async () => {
    const bog = await Bog.insert({
      type: 'raised',
      climate: 'wet',
      substrate: 'acidic/non-acidic'
    });
    const res = await request(app)
      .put(`/api/v1/bogs/${bog.id}`)
      .send({ type: 'lowered' });
      

    expect(res.body).toEqual({ ...bog, type: 'lowered' });
  });

  it('drains a bog by id using DELETE', async () => {
    const bog = await Bog.insert({
      type: 'raised',
      climate: 'wet',
      substrate: 'acidic/non-acidic'
    });
    const res = await request(app)
      .delete(`/api/v1/bogs/${bog.id}`);
      
    expect(res.body).toEqual({ message: 'Drain the bog!' });
  });
});
