import { Router } from 'express';
import Log from '../models/Logs.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const log = await Log.insert(req.body);
      res.send(log);
    }
    catch(err){
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const log = await Log.getById(id);

      res.send(log);
    }
    catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const log = await Log.getAll();

      res.send(log);
    }
    catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, exists } = req.body;

      const newLog = await Log.updateById(id, { type, exists });
      res.send(newLog);
    }
    catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const log = await Log.deleteById(id);
      if(log) {
        res.send({ message: 'Screw logs!' });
      }
    }
    catch(err) {
      next(err);
    }
  });
