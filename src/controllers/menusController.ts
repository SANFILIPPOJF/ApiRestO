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
    async getById(req: Request, res: Response) {
        const responser = new Responser<Menu>(req, res);

        const menuId = req.params.id;
        
        if (faillingId(menuId))
        {
            responser.status = 400 ;
            responser.message = `${menuId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 
        try {
            const data = await menuServices.getById(Number(menuId));

            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Ce menu n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Récupération du menu ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    async new(req: Request, res: Response) {
        const responser = new Responser<Menu>(req, res);

        const { name, price } = req.body;

        if ( faillingString(name) || faillingPrice(price) )
        {
            responser.status = 400 ;
            responser.message = `Structure du body incorrect : { name : string , price : 0 < number <= 999.99 }` ;
            responser.send() ;
        } 
        

        try {
            const data = await menuServices.new(name, price);

            responser.status = 200;
            responser.message = `Création du menu ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    async edit(req: Request, res: Response) {
        const responser = new Responser<Menu>(req, res);

        const menuId = req.params.id;
        const { name, price } = req.body;

        if (faillingId(menuId))
        {
            responser.status = 400 ;
            responser.message = `${menuId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 

        if ( faillingString(name) || faillingPrice(price) )
        {
            responser.status = 400 ;
            responser.message = `Structure du body incorrect : { name : string , price : 0 < number <= 999.99 }` ;
            responser.send() ;
        } 
        try {
            const data = await menuServices.edit(Number(menuId), name, price);
            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Ce menu n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Modification du menu ${menuId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }

    }
}