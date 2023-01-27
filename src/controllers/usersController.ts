import { Request, Response } from 'express';
import { Responser } from '../module/Responser';
import { UsersServices } from '../services/usersServices';
import { faillingId, faillingString } from '../module/faillingTest';
import { stringLength as sl } from '../constants/backUp';
import * as jwt from 'jsonwebtoken';                        // token
import * as dotenv from 'dotenv';                           // token
import { TDataPartialUser, TDataToken } from '../types/types';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/user';

dotenv.config()                                             // token
const accessTokenSecret = process.env.SECRET_TOKEN!;       // token
const usersServices = new UsersServices();

/**
 * Class permettant le contrôle des données entrantes pour les requête User
 * * **.getById()**         : Récupération d'un User avec son id
 * * **.register()**        : Création d'un User
 * * **.login()**           : Authentification d'un User, fourni le token
 * * **.changeAdminLvl()**  : Changement du niveau d'admin d'un user
 */
export class UsersController {

    /** Récupération d'un User avec son id */
    async getById(req: Request, res: Response) {
        const responser = new Responser<Users>(req, res);
        const userId = req.body.userId!;

        try {
            const userData = await usersServices.getDataById(userId)!;
            if (!userData) {
                responser.status = 404;
                responser.message = `User absent de la base de données`;
                responser.send();
                return;
            }
            console.log(userData);
            responser.status = 200;
            responser.message = `données de ${userData.name} récupérée(s)`;
            responser.data = userData
            responser.send();
            return userData
        } catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Création d'un User */
    async register(req: Request, res: Response) {
        const responser = new Responser<TDataPartialUser>(req, res);
        const { name, password } = req.body;
        if (faillingString(name, sl.name.min, sl.name.max)) {
            responser.status = 400;
            responser.message = `${name} n'est pas au bon format (chaine de caractere comprise entre ${sl.name.min} et ${sl.name.max} caracteres)`;
            responser.send();
            return;
        }
        if (faillingString(password, sl.password.min, sl.password.max)) {
            responser.status = 400;
            responser.message = `Votre mot de passe n'est pas au bon format (chaine de caractere comprise entre ${sl.password.min} et ${sl.password.max} caracteres)`;
            responser.send();
            return;
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                const userExist = await usersServices.getUserByName(name);
                if (userExist) {
                    responser.status = 409;
                    responser.message = `${name} existe déjà`;
                    responser.send();
                    return;
                }
                const data = await usersServices.addUser(name, hash);
                responser.status = 202;
                responser.message = `${name} bien enregistré`;
                responser.data = {
                    id: data.id,
                    name: data.name,
                    admin_lvl: data.admin_lvl
                };
                responser.send();
            } catch (err: any) {
                console.log(err.stack)
                responser.send();
            }
        })
    }

    /** Authentification d'un User, fourni le token */
    async login(req: Request, res: Response) {
        const responser = new Responser<TDataToken>(req, res);
        const { name, password } = req.body;
        if (faillingString(name) || faillingString(password)) {
            responser.status = 400;
            responser.message = `Structure du body incorrect : { name : string , password : string }`;
            responser.send();
            return;
        }

        try {
            const data = await usersServices.getUserByName(name);
            console.log(data);

            if (!data) {
                responser.status = 401;
                responser.message = `Username ou password incorrect`;
                responser.send();
                return;
            }
            bcrypt.compare(password, data.password, function (err, result) {


                if (!result) {
                    responser.status = 401;
                    responser.message = `Username ou password incorrect`;
                    responser.send();
                    return;
                }

                const token = {
                    id: data.id,
                    admin_lvl: data.admin_lvl
                }

                responser.status = 202;
                responser.message = `Connection de ${name}`;
                responser.data = {
                    id: data.id,
                    admin_lvl: data.admin_lvl,
                    name: data.name,
                    token: jwt.sign(token, accessTokenSecret!)
                };
                responser.send();
            })


        } catch (err: any) {
            console.log(err)
            responser.send();
        }
    }

    /** Changement du niveau d'admin d'un user */
    async changeAdminLvl(req: Request, res: Response) {
        const responser = new Responser<Users>(req, res);
        const userLvl = req.params.lvl;
        const idToUpgrade = req.params.idToUpgrade;

        if (faillingId(userLvl) || faillingId(idToUpgrade) || Number(userLvl) > 2) {
            responser.status = 400;
            responser.message = `Structure incorrecte : users/:idToUpgrade : number /:userLvl : number `;
            responser.send();
            return;
        }

        try {
            const user = await usersServices.upgradeAdminLvl(Number(idToUpgrade), Number(userLvl));

            if (!user) {
                responser.status = 404;
                responser.message = `Ce User n'existe pas`;
                responser.send();
                return;
            }

            responser.status = 200;
            responser.message = `nouveau niveau admin de ${user.name} est ${user.admin_lvl}`;
            responser.data = user;
            responser.send();

        } catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

}