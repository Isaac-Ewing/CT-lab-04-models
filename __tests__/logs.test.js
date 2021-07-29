import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Log from '../lib/models/Logs.js';

describe('log routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get logs', async () => {
    const res = await request(app)
      .post('/api/v1/logs')
      .send({ id: 1, type: 'oak', exists: false });

    expect(res.body).toEqual({
      id: '1',
      type: 'oak', 
      exists: false
    });
  });

  it('gets a log by id', async () => {
    const cog = await Log.insert({
      id: '1',
      type: 'oak', 
      exists: false
    });
    const res = await request(app)
      .get(`/api/v1/logs/${cog.id}`);
    
    expect(res.body).toEqual(cog);
  });

  it('gets all logs using GET', async () => {
    const tree = await Log.insert({
      id: '1',
      type: 'oak', 
      exists: false
    });
    const otherTree = await Log.insert({
      id: '2',
      type: 'pine', 
      exists: true
    });
    const res = await request(app)
      .get('/api/v1/logs/');
      

    expect(res.body).toEqual([tree, otherTree]);
  });

  it('updates a log by id using PUT', async () => {
    const log = await Log.insert({
      id: '1',
      type: 'oak', 
      exists: false
    });
    const res = await request(app)
      .put(`/api/v1/logs/${log.id}`)
      .send({ type: 'spruce', exists: true });
      

    expect(res.body).toEqual({ id: '1', type: 'spruce', exists: true });
  });

  it('destroys a log by id using DELETE', async () => {
    const cog = await Log.insert({
      type: 'oak', 
      exists: false
    });
    const res = await request(app)
      .delete(`/api/v1/logs/${cog.id}`);
      
    expect(res.body).toEqual({ message: 'Screw logs!' });
  });
});
