import { Request, Response } from 'express';
import { MenuServices } from '../services/menusServices';
import { Menu } from '../entities/menu';
import { Responser } from '../module/Responser';
import { faillingId, faillingPrice, faillingString } from '../module/faillingTest';

const menuServices = new MenuServices()

/**
 * Class permettant le contrôle des données entrantes pour les requête Menu
 * * **.getAll()**    : Récupération de tous les Menu
 * * **.getById()**   : Récupération d'un Menu avec son id
 * * **.new()**       : Création d'un Menu
 * * **.edit()**      : Modification d'un Menu
 * * **.delete()**    : Suppression d'un Menu 
 */
export class MenusController {

    /** Récupération de tous les Menu */
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

    /** Récupération d'un Menu */
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

    /** Création d'un Menu */
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

            responser.status = 201;
            responser.message = `Création du menu ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Modification d'un Menu */
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

    /** Suppression d'un Menu */
    async delete(req: Request, res: Response) {
        const responser = new Responser<number>(req, res);

        const menuId = req.params.id;

        if (faillingId(menuId))
        {
            responser.status = 400 ;
            responser.message = `${menuId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 

        try {
            const data = await menuServices.delete(Number(menuId));
            if (data === 0) 
            {
                responser.status = 404 ;
                responser.message = `Ce menu n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Suppression du menu ${menuId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
}