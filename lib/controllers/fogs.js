import { Router } from 'express';
import Fog from '../models/Fog.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const fog = await Fog.insert(req.body);
      res.send(fog);
    }
    catch(err){
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const fog = await Fog.getById(id);

      res.send(fog);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const fog = await Fog.getAll();

      res.send(fog);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, formedby } = req.body;

      const newFog = await Fog.updateById(id, { type, formedby });
      res.send(newFog);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const fog = await Fog.deleteById(id);
      if(fog) {
        res.send({ message: 'I like fog' });
      }
    }
    catch(err) {
      next(err);
    }
  });
