import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { MenusController } from '../controllers/menusController';
import { adminLvl2 } from '../middleware/adminLvl2';

/** Essemble des routes /api/menus */
export const menusRouter = express.Router();

const menusController = new MenusController();

/** Route de récupération des menus */
menusRouter.get('/', menusController.getAll)

/** Route de récupération d'un menu */
menusRouter.get('/:id', menusController.getById)

/** Route de création d'un menu */
menusRouter.post('/', authenticateJWT , adminLvl2 , menusController.new)

/** Route de modification d'un menu */
menusRouter.put('/:id', authenticateJWT , adminLvl2 , menusController.edit)

/** Route de suppression d'un menu */
menusRouter.delete('/:id', authenticateJWT , adminLvl2 , menusController.delete)