import express from 'express';
import { adminLvl2 } from '../middleware/adminLvl2';
import { authenticateJWT } from '../middleware/auth';
import { RestosController } from '../controllers/restosController';

export const restosRouter = express.Router();

const restosController = new RestosController();

/** DONE */
restosRouter.get('/', restosController.getAll)

/** OPTION */
restosRouter.get('/:param', restosController.getBy)


restosRouter.post('/', authenticateJWT , adminLvl2 , restosController.add)

restosRouter.put('/:id', authenticateJWT , adminLvl2 , restosController.edit)

restosRouter.delete('/:id', authenticateJWT , adminLvl2 , restosController.delete)