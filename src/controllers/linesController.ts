import { Request, Response } from 'express';
import { LinesServices } from '../services/linesServices';

import { Responser } from '../module/Responser';
import { faillingId} from '../module/faillingTest';

import { OrderLine } from '../entities/orderLine';
import { OrdersServices } from '../services/ordersServices';

const linesServices = new LinesServices()
const ordersServices = new OrdersServices()

export class LinesController {
    async getFromOrder(req: Request, res: Response) {

        const responser = new Responser<OrderLine[]>(req, res);
        const orderId = parseInt(req.params.id);
        if (faillingId(orderId))
        {
            responser.status = 400 ;
            responser.message = `${orderId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        }
        try {
            if (!await ordersServices.getById(orderId) ) {
                responser.status = 404 ;
            responser.message = `order ${orderId} n'existe pas` ;
            responser.send() ;
            return ;
            }
            const data = await linesServices.getAllFrom(orderId);

            responser.status = 200;
            responser.message = `Récupération de toutes les lingnes de la commande`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    async new(req: Request, res: Response) {
        const responser = new Responser<OrderLine>(req, res);

        const { order_id, menu_id, multiplicator } = req.body;

        if ( faillingId(order_id) || faillingId(menu_id) || faillingId(multiplicator) )
        {
            responser.status = 400 ;
            responser.message = `Structure du body incorrect : { menu_id : integer , order_id : integer , multiplicator : integer }` ;
            responser.send() ;
        }

        try {
            const data = await linesServices.add(order_id, menu_id, multiplicator);

            responser.status = 201;
            responser.message = `Création de la ligne de commande ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    async edit(req: Request, res: Response) {
        const responser = new Responser<OrderLine>(req, res);

        const lineId = req.params.id;
        const { menu_id, multiplicator } = req.body;

        if (faillingId(lineId))
        {
            responser.status = 400 ;
            responser.message = `${lineId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 
        if (faillingId(menu_id) || faillingId(multiplicator))
        {
            responser.status = 400 ;
            responser.message = `Structure du body incorrect : { menu_id : integer , multiplicator : integer }` ;
            responser.send() ;
            return ;
        } 

        try {
            const data = await linesServices.edit(Number(lineId), menu_id, multiplicator);
            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Cette ligne de commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Modification de la ligne de commande ${lineId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }

    }
    async delete(req: Request, res: Response) {
        const responser = new Responser<number>(req, res);

        const lineId = req.params.id;

        if (faillingId(lineId))
        {
            responser.status = 400 ;
            responser.message = `${lineId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 

        try {
            const data = await linesServices.delete(Number(lineId));
            if (data === 0) 
            {
                responser.status = 404 ;
                responser.message = `Cette ligne de commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Suppression de la ligne de commande ${lineId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
}