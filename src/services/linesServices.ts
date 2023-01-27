
import { Menu } from "../entities/menu";
import { Order } from "../entities/order";
import { OrderLine } from "../entities/orderLine";



/**
 * Permet la gestion des requetes SQL orderlines.
 * 
 * * **getAllFrom()**   : Récupération de toutes les lignes d'une commande
 * * **add()**          : Ajout d'une ligne de commande
 * * **edit()**         : Modification d'une ligne de commande
 * * **delete()**       : Suppression d'une ligne de commande
 */
export class LinesServices {

    /**
     * Récupération de toutes les lignes d'une commande
     * @param orderId   L'id de la commande
     * @returns         Liste des lignes consernées
     */
    async getAllFrom(orderId: number): Promise<OrderLine[]> {
        return await OrderLine.find({
            where: {
                order: { id : orderId }
            }
        })
    }

    /**
     * Ajout d'une ligne de commande
     * @param newOrderId        L'id de la commande
     * @param newMenuId         L'id du Menu
     * @param newMultiplicator  Le multiplicateur de Menus
     * @returns                 La nouvelle ligne de commande
     */
    async add(newOrderId: number, newMenuId: number, newMultiplicator?: number): Promise<OrderLine> {
        const line = new OrderLine() ;

        const order = await Order.findOneBy({ id: newOrderId })
        if (order) line.order = order ;

        const menu = await Menu.findOneBy({ id: newMenuId })
        if (menu) line.menu = menu ;

        if (newMultiplicator) line.multiplicator = newMultiplicator;
        return await line.save() ;
    }

    /**
     * Modification d'une ligne de commande
     * @param id                id de la ligne de commande
     * @param newMenuId         id du nouveau Menu
     * @param newMultiplicator  nouveau multiplicateur
     * @returns                 la ligne modifiée si elle existe, sinon null
     */
    async edit(id: number, newMenuId?: number, newMultiplicator?: number): Promise<OrderLine | null> {
        const line = await OrderLine.findOneBy({ id: id })
        if (line !== null) {
            const menu = await Menu.findOneBy({ id: newMenuId })
            if (menu) line.menu = menu
            if (newMultiplicator) line.multiplicator = newMultiplicator;
            return await line.save();
        }
        return null;
    }

    /**
     * Suppression d'une ligne de commande
     * @param id    id de la ligne à supprimer
     * @returns     1 si la ligne à bien été supprimée, sinon 0
     */
    async delete(id: number): Promise<number> {
        const line = await OrderLine.findOneBy({ id: id })
        line?.remove()
        return line ? 1 : 0;
    }

}