import { Request, Response } from 'express';
import { OrdersServices } from '../services/ordersServices';
import { RestosServices } from '../services/restosServices';
import { Order } from '../entities/order';
import { Responser } from '../module/Responser';
import { faillingBool, faillingId, faillingPrice, faillingString } from '../module/faillingTest';


const ordersServices = new OrdersServices()
const restosServices = new RestosServices()
export class OrdersController {
/*
    async getFullById(req: Request, res: Response){
        const responser = new Responser<Order>(req, res);
        responser.data?.lines
    }*/

    async getAll(req: Request, res: Response) {

        const responser = new Responser<Order[]>(req, res);

        try {
            const data = await ordersServices.getAll();

            responser.status = 200;
            responser.message = `Récupération de toutes les commandes`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    async getAllByUserId(req: Request, res: Response) {
        const responser = new Responser<Order[]>(req, res);
        const {userId} = req.body

        try {
            const data = await ordersServices.getAllByUserId(userId);

            responser.status = 200;
            responser.message = `Récupération de toutes les commandes`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    async getById(req: Request, res: Response) {
        const responser = new Responser<Order>(req, res);
        const { userId, adminLvl } = req.body

        const orderId = req.params.id;
        
        if (faillingId(orderId))
        {
            responser.status = 400 ;
            responser.message = `Stucture incorrecte { restoId : ${orderId} n'est pas un nombre entier}` ;
            responser.send() ;
            return ;
        } 
        try {
            const data = await ordersServices.getById(Number(orderId));

            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            } 
            if (data.user.id !== userId && adminLvl <2) 
            {
                responser.status = 400 ;
                responser.message = `Cette commande ne vous appartient pas` ;
                responser.send() ;
                return ;
            }

            responser.status = 200;
            responser.message = `Récupération de la commande ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    async new(req: Request, res: Response) {
        const responser = new Responser<Order>(req, res);
        const {userId ,restoId} = req.body
        if (faillingId(restoId))
        {
            responser.status = 400 ;
            responser.message = `Stucture incorrecte { restoId : ${restoId} n'est pas un nombre entier}` ;
            responser.send() ;
            return ;
        }

        try {
            const verifyResto = await restosServices.getRestoById(restoId) ;
            if (!verifyResto){
                responser.status = 400 ;
                responser.message = `Ce resto n'existe pas` ;
                responser.send() ;
                return ;
            }
            const oldOrder = await ordersServices.onStatus1(userId)
            if (oldOrder)
            {
                responser.status = 200;
                responser.message = `Une commande est déjà ouverte`;
                responser.data = oldOrder;
                responser.send();
            }

            const data = await ordersServices.new(userId , restoId );

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
        const responser = new Responser<Order>(req, res);
        const served  = req.body.served ;
        const orderId = req.params.id   ;

        if (faillingId(orderId) || faillingBool(served))
        {
            responser.status = 400 ;
            responser.message = `Stucture incorrecte : /${orderId} : integer  { served : ${served} n'est pas un boolean }` ;
            responser.send() ;
            return ;
        } 
        try {
            const data = await ordersServices.edit(Number(orderId) , served);
            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Modification de la commande ${orderId}`;
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

        const orderId = req.params.id;

        if (faillingId(orderId))
        {
            responser.status = 400 ;
            responser.message = `${orderId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 

        try {
            const data = await ordersServices.delete(Number(orderId));
            if (data === 0) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Suppression de la commande ${orderId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
}