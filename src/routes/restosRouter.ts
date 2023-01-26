import express from 'express';
import { RestosController } from '../controllers/restosController';

export const restosRouter = express.Router();

const restosController = new RestosController();

/** DONE */
restosRouter.get('/', restosController.getAll)

/** OPTION */
restosRouter.get('/:param', restosController.getBy)


restosRouter.post('/', restosController.add)

restosRouter.put('/:id', restosController.edit)

restosRouter.delete('/:id', restosController.delete)