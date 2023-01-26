import express from 'express';
import { LinesController } from '../controllers/linesController';

export const linesRouter = express.Router();

const linesController = new LinesController();
linesRouter.get('/:id', linesController.getFromOrder)
linesRouter.post('/', linesController.new)
linesRouter.put('/', linesController.edit)
linesRouter.delete('/', linesController.delete)