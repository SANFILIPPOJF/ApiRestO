
import {Request,Response} from 'express';
import { Responser } from '../module/Responser';


export const adminLvl1 = (req: Request, res: Response, next: () => void) => {
    const responser = new Responser(req, res);
    const adminLvl = req.body.adminLvl
    if (adminLvl< 1 ) {
        responser.status = 400;
        responser.message = `Niveau d'admin necessaire`;
        responser.send();
        return;
    } 
    next()
    
};
