import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cog from '../lib/models/Cog.js';

describe('cog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get cogs', async () => {
    const res = await request(app)
      .post('/api/v1/cogs')
      .send({ id: 1, functions: 'ship', firstuse: '10th century' });

    expect(res.body).toEqual({
      id: '1',
      functions: 'ship', 
      firstuse: '10th century'
    });
  });

  it('gets a cog by id', async () => {
    const cog = await Cog.insert({
      id: '1',
      functions: 'ship', 
      firstuse: '10th century'
    });
    const res = await request(app)
      .get(`/api/v1/cogs/${cog.id}`);
    
    expect(res.body).toEqual(cog);
  });

  it('gets all cogs using GET', async () => {
    const ship = await Cog.insert({
      id: '1',
      functions: 'ship', 
      firstuse: '10th century'
    });
    const gear = await Cog.insert({
      id: '2',
      functions: 'gear', 
      firstuse: '4th century'
    });
    const res = await request(app)
      .get('/api/v1/cogs/');
      

    expect(res.body).toEqual([ship, gear]);
  });

  it('updates a cog by id using PUT', async () => {
    const cog = await Cog.insert({
      id: '1',
      functions: 'ship', 
      firstuse: '10th century'
    });
    const res = await request(app)
      .put(`/api/v1/cogs/${cog.id}`)
      .send({ functions: 'boat', firstuse: '5th century' });
      

    expect(res.body).toEqual({ id: '1', functions: 'boat', firstuse: '5th century' });
  });

  it('destroys a cog by id using DELETE', async () => {
    const cog = await Cog.insert({
      functions: 'ship', 
      firstuse: '10th century'
    });
    const res = await request(app)
      .delete(`/api/v1/cogs/${cog.id}`);
      
    expect(res.body).toEqual({ message: 'Screw cogs!' });
  });
});
