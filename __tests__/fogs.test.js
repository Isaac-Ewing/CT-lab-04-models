import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Fog from '../lib/models/Fog.js';

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

  it('gets a fog by id', async () => {
    const fog = await Fog.insert({
      id: '1',
      type: 'radiation fog',
      formedby: 'heat transfer'
    });
    const res = await request(app)
      .get(`/api/v1/fogs/${fog.id}`);
    
    expect(res.body).toEqual(fog);
  });

  it('gets all fogs using GET', async () => {
    const fog = await Fog.insert({
      id: '1',
      type: 'radiation fog', 
      formedby: 'heat transfer'
    });
    const moreFog = await Fog.insert({
      id: '2',
      type: 'advection fog', 
      formedby: 'moisture and air movement'
    });
    const res = await request(app)
      .get('/api/v1/fogs/');
      

    expect(res.body).toEqual([fog, moreFog]);
  });

  it('updates fog by id using PUT', async () => {
    const fog = await Fog.insert({
      id: '1',
      type: 'radiation fog', 
      formedby: 'heat transfer'
    });
    const res = await request(app)
      .put(`/api/v1/fogs/${fog.id}`)
      .send({ type: 'advection fog', formedby: 'moisture and air movement' });
      

    expect(res.body).toEqual({ id: '1', type: 'advection fog', formedby: 'moisture and air movement' });
  });

  it('get rid of fog by id using DELETE', async () => {
    const fog = await Fog.insert({
      type: 'radiation fog', 
      formedby: 'heat transfer'
    });
    const res = await request(app)
      .delete(`/api/v1/fogs/${fog.id}`);
      
    expect(res.body).toEqual({ message: 'I like fog' });
  });
});
