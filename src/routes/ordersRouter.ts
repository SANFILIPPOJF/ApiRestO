import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { OrdersController } from '../controllers/ordersController';
import { adminLvl2 } from '../middleware/adminLvl2';
import { adminLvl1 } from '../middleware/adminLvl1';

export const ordersRouter = express.Router();

const ordersController = new OrdersController();

/** Route de récupération des commandes */
ordersRouter.get('/', authenticateJWT ,adminLvl2, ordersController.getAll)

/** Route de récupération des commandes d'un user*/
ordersRouter.get('/byUser/:id', authenticateJWT , adminLvl1, ordersController.getAllByUserId)

/** Route de récupération des commandes d'un resto*/
ordersRouter.get('/byResto/:id', authenticateJWT , adminLvl1, ordersController.getAllByRestoId)

/** Route de récupération d'une commande */
ordersRouter.get('/:id', authenticateJWT, ordersController.getById)

/** Route de création d'une commande */
ordersRouter.post('/', authenticateJWT , ordersController.new)

/** Route d'ajout d'un menu à une commande */
ordersRouter.put('/addMenu/:idMenu', authenticateJWT , ordersController.addMenu)

/** Route de suppresion d'un menu à une commande */
ordersRouter.put('/supMenu/:idMenu', authenticateJWT , ordersController.supMenu)

/** Route d'evolution du statut d'une commande */
ordersRouter.put('/:id', authenticateJWT , ordersController.edit)

/** Route de suppression d'une commande */
ordersRouter.delete('/:id', authenticateJWT , ordersController.delete)