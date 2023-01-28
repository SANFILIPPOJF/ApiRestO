
import { Users } from "../entities/user";
import { Order } from "../entities/order";
import { Resto } from "../entities/resto";
import { OrderLine } from "../entities/orderLine";
import { Menu } from "../entities/menu";
import { Timestamp } from "typeorm";


/**
 * Permet la gestion des requetes SQL orders.
 * 
 * * **getAll()**           : Récupération de toutes les commandes
 * * **getById()**          : Récupération d'une commande
 * * **getAllByUserId()**   : Récupération de toutes les commandes d'un user
 * * **onStatus1()**        : Récupération de la seule commande ouverte par l'utilisateur
 * * **new()**              : Création d'une nouvelle commande
 * * **addMenu()**          : Ajout d'un ou plusieurs menus à une commande
 * * **supMenu()**          : Suppression d'un ou plusieurs menus à une commande
 * * **edit()**             : Modification du status d'une commande
 * * **delete()**           : Suppression d'une commande
 */
export class OrdersServices {

    /**
     * Récupération de toutes les commandes
     * @returns Toutes les commandes
     */
    async getAll(): Promise<Order[]> {
        const orders = await Order.find(
            {
                select : {
                    user : {
                        id : true
                    }
                } ,
                relations: {
                    user : true, 
                    resto: true,
                    lines: {
                        menu: true
                    }
                }
            })
        return orders
    }
    
    /**
     * Récupération d'une commande
     * @param id    l'id de la commande
     * @returns     La commande recherchée si elle existe, sinon null
     */
    async getById(id: number): Promise<Order | null> {
        return await Order.findOne({
            relations: {
                user: true,
                resto: true,
                lines: {
                    menu: true
                }
            },
            where : { id : id }
        })
    }

    /**
     * Récupération de toutes les commandes d'un user
     * @param userId    L'id du User
     * @returns         La liste des commandes du user
     */
async getAllByRestoId(restoId: number): Promise<Order[]> {
    const orders = await Order.find(
        {
            relations: {
                user: true,
                resto: true,
                lines: {
                    menu: true
                }
            },
            where : {
                resto : {
                    id : restoId
                }
            }
        })
    return orders
}

    /**
     * Récupération de toutes les commandes d'un user
     * @param userId    L'id du User
     * @returns         La liste des commandes du user
     */
    async getAllByUserId(userId: number): Promise<Order[]> {
        const orders = await Order.find(
            {
                relations: {
                    user: true,
                    resto: true,
                    lines: {
                        menu: true
                    }
                },
                where : {
                    user : {
                        id : userId
                    }
                }
            })
        return orders
    }

    /**
     * Récupération de la seule commande ouverte par l'utilisateur
     * @param userId    L'id du user
     * @returns         La commande ouverte
     */
    async onStatus1(userId : number){
        return await Order.findOne(
            {
                relations : { 
                    user : true ,
                    lines : {menu : true},
                    resto : true
                },
                where : { 
                    user : {id : userId},
                    status : 1
                }
            }
        )
    }

    /**
     * Création d'une nouvelle commande
     * @param userId    id du propriétaire
     * @param restoId   id du resto
     * @returns         La commande nouvellement ouverte
     */
    async new(userId: number, restoId: number): Promise<Order> {
        const order = new Order();

        const user = await Users.findOneBy({ id: userId })
        if (user) order.user = user

        const resto = await Resto.findOneBy({ id: restoId })
        if (resto) order.resto = resto

        return await order.save()
    }

    /**
     * Ajout d'un ou plusieurs menus à une commande
     * @param userId            id du propriétaire de la commande
     * @param menuId            id du menu à ajouter
     * @param multiplicator     nombre de menu à ajouter
     * @returns                 La commande complétée
     */
    async addMenu(userId : number , menuId : number, multiplicator : number  ) {
        const currentOrder = await this.onStatus1(userId)

        if (currentOrder){
            let add = false
            const curItem = currentOrder.lines.find(item => item.menu.id === menuId) 
            if (curItem) {
                curItem.multiplicator += multiplicator
                await curItem.save()
                add = true
            }

            
            if (!add){
                const newLine = new OrderLine()
                newLine.multiplicator = multiplicator
                const targetMenu = await Menu.findOneBy({id : menuId})
                if (targetMenu) {
                    newLine.menu = targetMenu;
                }

                //newLine.order = currentOrder ;
                currentOrder.lines.push(newLine)
                await newLine.save()
            }
            await currentOrder.save()
        }
        return currentOrder
    }

    /**
     * Suppression d'un ou plusieurs menus à une commande
     * @param userId            id du propriétaire de la commande
     * @param menuId            id du menu à ajouter
     * @param multiplicator     nombre de menu à supprimer
     * @returns                 La commande complétée
     */
    async supMenu(userId : number , menuId : number, multiplicator : number  ) {
        const currentOrder = await this.onStatus1(userId)

        if (currentOrder){
            const curItem = currentOrder.lines.find(item => item.menu.id === menuId)
            if (curItem){
                curItem.multiplicator -= multiplicator
                
                if (curItem.multiplicator <= 0 ) {
                    await curItem.remove()
                }
                else
                {
                    await curItem.save()
                }
            }
        }
        return await this.onStatus1(userId)
    }
    
    /**
     * Modification du status d'une commande :
     * * 1 : en cours
     * * 2 : validée (par le client)
     * * 3 : prise en compte (restaurant)
     * * 4 : servie
     * 
     * @param id        id de la commande
     * @param status    Le nouveau statut
     * @returns         La commande complétée
     */
    async edit(id: number, status: number): Promise<Order | null> {
        const order = await Order.findOneBy({ id: id })
        if (order && !order.served_at) {
            switch (status) {
                case 2:
                    order.status=2;
                    order.validated_at=new Date(Date.now()) ;
                    await order.save();
                    break;
                case 3:
                    order.status=3;
                    order.checked_at=new Date(Date.now()) ;
                    await order.save();
                    break;
                case 4:
                    order.status=4;
                    order.served_at=new Date(Date.now()) ;
                    await order.save();
                    break;
            }
        }
        return order;
    }

    /**
     * Suppression d'une commande et de ses lignes
     * @param id    id de la commande
     * @returns     1 si la commande à bien été supprimée, sinon 0
     */
    async delete(id: number): Promise<number> {
        const order = await Order.findOne(
            {
                relations : { 
                    lines : {menu : true}
                },
                where : {id : id}
            }
        )
        if (order){
            for (let i=0; i<order.lines.length;i++){
                const line = await OrderLine.findOneBy({ id: order.lines[i].id })
                line?.remove()
            }
            order?.remove()
        }
        return order ? 1 : 0;
    }
}