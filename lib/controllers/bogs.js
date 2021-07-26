import { Router } from 'express';
import Bog from '../models/Bog.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const bog = await Bog.insert(req.body);
      res.send(bog);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const bog = await Bog.getById(id);
    
      res.send(bog);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const bog = await Bog.getAll();
    
      res.send(bog);
    } catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, climate, substrate } = req.body;
    
      const newBog = await Bog.updateById(id, { type, climate, substrate });
    
      res.send(newBog);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const bog = await Bog.deleteById(id);
      if(bog){
        res.send({
          message: ''
        });
      }
    
    } catch(err) {
      next(err);
    }
  });
