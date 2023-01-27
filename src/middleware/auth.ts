import * as jwt from 'jsonwebtoken';
import {Request,Response} from 'express';
import * as dotenv from 'dotenv';
import { Responser } from '../module/Responser';
import { TToken } from '../types/types';

dotenv.config();

const accessTokenSecret = process.env.SECRET_TOKEN!;

export const authenticateJWT = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    const responser = new Responser(req, res);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                responser.status = 401;
                responser.message = `User doit etre connecté`;
                responser.send();
                return;
            }
            if (token) {
                const newToken : TToken = token as TToken
                req.body.adminLvl = newToken.admin_lvl;
                req.body.userId = newToken.id;
                next();
            }

        });
    } else {
        responser.status = 401;
        responser.message = `User doit etre connecté`;
        responser.send();
    }
};
