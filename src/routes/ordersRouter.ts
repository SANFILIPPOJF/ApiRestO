import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { OrdersController } from '../controllers/ordersController';
import { adminLvl2 } from '../middleware/adminLvl2';

export const ordersRouter = express.Router();

const ordersController = new OrdersController();
/* Route de récupération d'une commande complete
ordersRouter.get('/full/:id', ordersController.getFullById)
*/


/** DONE */
/** Route de récupération des commandes */
ordersRouter.get('/', authenticateJWT ,adminLvl2, ordersController.getAll)

/** DONE */
/** Route de récupération des commandes */
ordersRouter.get('/byUser/', authenticateJWT , ordersController.getAllByUserId)

/** OPTION */
/** Route de récupération d'une commande */
ordersRouter.get('/:id', authenticateJWT, ordersController.getById)

/** DONE */
/** Route de création d'une commande */
ordersRouter.post('/', authenticateJWT , ordersController.new)

/** Route d'ajout d'un menu à une commande */
ordersRouter.put('/addMenu/:idMenu', authenticateJWT , ordersController.addMenu)

/** Route de suppresion d'un menu à une commande */
ordersRouter.put('/supMenu/:idMenu', authenticateJWT , ordersController.supMenu)

/** Route de modification d'une commande */
ordersRouter.put('/:id', authenticateJWT , ordersController.edit)

/** Route de suppression d'une commande */
ordersRouter.delete('/:id', authenticateJWT , ordersController.delete)