import express,{Request,Response} from 'express';
import { Users } from '../entities/user';
import { AppDataSource } from '../module/clientData';

export class UsersController {
    async register(req: Request, res: Response) {
        await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values([
        { name: "first_user", password: "MDP", adminLvl: 0}
    ])
    .execute()
        
    }

    async login(req: Request, res: Response) {
        console.log("salut login");
        
    }
}