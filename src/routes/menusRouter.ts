import express from 'express';
import { MenusController } from '../controllers/menusController';

export const menusRouter = express.Router();

const menusController = new MenusController();

/** Route de récupération des menus */
menusRouter.get('/', menusController.getAll)

/** Route de récupération d'un menu */
menusRouter.get('/:id', menusController.getById)

/** Route de création d'un menu */
menusRouter.post('/', menusController.new)

/** Route de modification d'un menu */
menusRouter.put('/:id', menusController.edit)

/** Route de suppression d'un menu */
menusRouter.delete('/:id', menusController.delete)