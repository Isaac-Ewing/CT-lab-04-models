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
  });
