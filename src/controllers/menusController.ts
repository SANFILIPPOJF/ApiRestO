import { Request, Response } from 'express';
import { MenuServices } from '../services/menuServices';
import { Menu } from '../entities/menu';
import { Responser } from '../module/Responser';
import { faillingId, faillingPrice, faillingString } from '../module/faillingTest';

const menuServices = new MenuServices()

export class MenusController {
    async getAll(req: Request, res: Response) {

        const responser = new Responser<Menu[]>(req, res);

        try {
            const data = await menuServices.getAll();

            responser.status = 200;
            responser.message = `Récupération de tous les menus`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
}