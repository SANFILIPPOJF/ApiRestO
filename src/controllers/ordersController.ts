import { Request, Response } from 'express';
import { OrdersServices } from '../services/ordersServices';
import { RestosServices } from '../services/restosServices';
import { Order } from '../entities/order';
import { Responser } from '../module/Responser';
import { faillingBool, faillingId, faillingPrice, faillingString } from '../module/faillingTest';
import { UsersServices } from '../services/usersServices';


const ordersServices = new OrdersServices()
const restosServices = new RestosServices()
const usersServices = new UsersServices();

/**
 * Class permettant le contrôle des données entrantes pour les requête Order
 * * **.getAll()**          : Récupération de toutes les Commandes
 * * **.getById()**         : Récupération d'une Commandes avec son id
 * * **.getAllByUserId()**  : Récupération d'une Commandes avec son id
 * * **.new()**             : Création d'une Commandes
 * * **.edit()**            : Modification d'une Commandes
 * * **.addMenu()**         : Ajout d'un menu à une Commandes
 * * **.supMenu()**         : Suppression d'un menu d'une Commandes
 * * **.delete()**          : Suppression d'une Commandes 
 */
export class OrdersController {

    /** Récupération de toutes les Commandes */
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

    /** Récupération d'une Commandes avec son id */
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
                responser.status = 403 ;
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
    
    /** Récupération de toutes les Commandes d'un resto */
    async getAllByRestoId(req: Request, res: Response) {
        const responser = new Responser<Order[]>(req, res);
        const restoId = parseInt(req.params.id);
        if (faillingId(restoId))
        {
            responser.status = 400 ;
            responser.message = `Stucture incorrecte { id : ${restoId} n'est pas un nombre entier}` ;
            responser.send() ;
            return ;
        }
        try {
            const verifyResto = await restosServices.getRestoById(restoId) ;
            if (!verifyResto){
                responser.status = 404 ;
                responser.message = `Ce resto n'existe pas` ;
                responser.send() ;
                return ;
            }
            const data = await ordersServices.getAllByRestoId(restoId);

            responser.status = 200;
            responser.message = `Récupération de toutes les commandes du resto ${restoId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Récupération de toutes les Commandes d'un utilisateur */
    async getAllByUserId(req: Request, res: Response) {
        const responser = new Responser<Order[]>(req, res);
        const userId = parseInt(req.params.id)
        
        if (faillingId(userId)) {
            responser.status = 400;
            responser.message = `Structure du body incorrect : { id : integer }`;
            responser.send();
            return;
        }

        try {
            const userData = await usersServices.getDataById(userId)!;
            if (!userData) {
                responser.status = 404;
                responser.message = `User n'existe pas`;
                responser.send();
                return;
            }
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

    /** Création d'une Commandes */
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
                responser.status = 404 ;
                responser.message = `Ce resto n'existe pas` ;
                responser.send() ;
                return ;
            }
            const oldOrder = await ordersServices.onStatus1(userId)
            if (oldOrder)
            {
                responser.status = 409;
                responser.message = `Une commande est déjà ouverte`;
                responser.data = oldOrder;
                responser.send();
                return;
            }

            const data = await ordersServices.new(userId , restoId );

            responser.status = 201;
            responser.message = `Création de la commande ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Modification d'une Commandes */
    async edit(req: Request, res: Response) {
        const responser = new Responser<Order>(req, res);
        const { userId , adminLvl } = req.body ;
        const orderId = req.params.id ;

        if (faillingId(orderId))
        {
            responser.status = 400 ;
            responser.message = `Stucture incorrecte : /${orderId} : integer ` ;
            responser.send() ;
            return ;
        }
        try {
            const verifyOrder = await ordersServices.getById(Number(orderId));
            if (!verifyOrder) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            }
            if (verifyOrder.user.id !== userId && adminLvl == 0) 
            {
                responser.status = 403 ;
                responser.message = `Cette commande n'est pas à vous` ;
                responser.send() ;
                return ;
            } 
            if (verifyOrder.status === 4 ) 
            {
                responser.status = 403 ;
                responser.message = `Cette commande à déjà été servie` ;
                responser.send() ;
                return ;
            } 
            if (verifyOrder.status > 1 && adminLvl == 0 ) 
            {
                responser.status = 403 ;
                responser.message = `Vous ne pouvez plus modifier cette commande` ;
                responser.send() ;
                return ;
            } 
            const data = await ordersServices.edit(Number(orderId) , verifyOrder.status+1);

            responser.status = 200;
            responser.message = `Modification de la commande ${orderId}`;
            responser.data = data!;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }

    }
    
    /** Ajout d'un menu à une Commandes */
    async addMenu(req: Request, res: Response) {
        const responser = new Responser<Order>(req, res);
        const menuId = req.params.idMenu;
        const {userId,mult} = req.body;
        
        const multiplicator = faillingId(mult) ? 1 : Number(mult)

        if (faillingId(menuId))
        {
            responser.status = 400 ;
            responser.message = `${menuId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 
        
        try {
            const data = await ordersServices.addMenu(userId,Number(menuId),multiplicator);
            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 201;
            responser.message = `Ajout Menu ${menuId} à la commande ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    
    /** Suppression d'un menu à une Commandes */
    async supMenu(req: Request, res: Response) {
        const responser = new Responser<Order>(req, res);
        const menuId = req.params.idMenu;
        const {userId,mult} = req.body;
        
        const multiplicator = faillingId(mult) ? 1 : Number(mult)

        if (faillingId(menuId))
        {
            responser.status = 400 ;
            responser.message = `${menuId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 
        
        try {
            const data = await ordersServices.supMenu(userId,Number(menuId),multiplicator);
            if (!data) 
            {
                responser.status = 404 ;
                responser.message = `Cette commande n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Retrait de ${multiplicator} Menu ${menuId} à la commande ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
    
    /** Suppression d'une Commandes */
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