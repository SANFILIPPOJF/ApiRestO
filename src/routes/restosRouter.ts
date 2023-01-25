import express from 'express';
import { RestosController } from '../controllers/restosController';

export const restosRouter = express.Router();

const restosController = new RestosController();

restosRouter.get('/', restosController.getAll)
restosRouter.get('/:param', restosController.getBy)
restosRouter.post('/', restosController.add)
restosRouter.put('/:id', restosController.edit)
restosRouter.delete('/:id', restosController.delete)