import { Router } from 'express';
import Cog from '../models/Cog.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      console.log(req.body, 'test!!!!!!!!!!!!!!!!!!!!');
      const cog = await Cog.insert(req.body);
      res.send(cog);
    }
    catch(err){
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const cog = await Cog.getById(id);

      res.send(cog);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cog = await Cog.getAll();

      res.send(cog);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { functions, firstuse } = req.body;

      const newCog = await Cog.updateById(id, { functions, firstuse });
      console.log(newCog, 'log????????????');
      res.send(newCog);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const cog = await Cog.deleteById(id);
      if(cog) {
        res.send({ message: 'Screw cogs!' });
      }
    }
    catch(err) {
      next(err);
    }
  });
