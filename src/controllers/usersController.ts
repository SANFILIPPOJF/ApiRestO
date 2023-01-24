import express, { Request, Response } from 'express';
import { Responser } from '../module/Responser';
import { Users } from '../entities/user';
import { AppDataSource } from '../module/clientData';
import { UsersService } from '../services/usersService';
import { faillingString } from '../module/faillingTest';
import { stringLength as sl } from '../constants/backUp';

const usersService = new UsersService();
export class UsersController {
    async register(req: Request, res: Response) {
        const responser = new Responser<Users>(req, res);
        const name: string = req.body.name;
        const password: string = req.body.password;
        if (faillingString(name,sl.name.min,sl.name.max)) {
            responser.status = 400;
            responser.message = `${name} n'est pas au bon format (chaine de caractere comprise entre ${sl.name.min} et ${sl.name.max} caracteres)`;
            responser.send();
            return;
        }
        if (faillingString(password,sl.password.min,sl.password.max)) {
            responser.status = 400;
            responser.message = `Votre mot de passe n'est pas au bon format (chaine de caractere comprise entre ${sl.password.min} et ${sl.password.max} caracteres)`;
            responser.send();
            return;
        }
        try {
            const userExist = await usersService.getUserByName(name);
            if (userExist) {
                responser.status = 400;
                responser.message = `${name} existe déjà`;
                responser.send();
                return;
            }
            const data = await usersService.addUser(name, password);
            responser.status = 200;
                responser.message = `${name} bien enregistré`;
                responser.data = data;
                responser.send();

        }catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    async login(req: Request, res: Response) {
        const name: string = req.body.name;
        const password: string = req.body.password;
        const data = await usersService.getUserByName(name);


    }


}