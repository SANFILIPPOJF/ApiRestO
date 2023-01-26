import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { OrdersController } from '../controllers/ordersController';

export const ordersRouter = express.Router();

const ordersController = new OrdersController();

/** Route de récupération d'une commande complete*/
ordersRouter.get('/full/:id', ordersController.getFullById)

/** Route de récupération des commandes */
ordersRouter.get('/', ordersController.getAll)

/** Route de récupération d'une commande */
ordersRouter.get('/:id', ordersController.getById)

/** Route de création d'une commande */
ordersRouter.post('/', authenticateJWT , ordersController.new)

/** Route de modification d'une commande */
ordersRouter.put('/:id', authenticateJWT , ordersController.edit)

/** Route de suppression d'une commande */
ordersRouter.delete('/:id', authenticateJWT , ordersController.delete)