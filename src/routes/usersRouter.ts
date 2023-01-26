import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { UsersController } from '../controllers/usersController';

export const usersRouter = express.Router();

const usersController = new UsersController();

/** DONE */
usersRouter.post('/register', usersController.register)

/** DONE */
usersRouter.post('/login', usersController.login)

usersRouter.get('/',authenticateJWT , usersController.getById)