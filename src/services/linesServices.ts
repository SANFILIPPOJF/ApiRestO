
import { Menu } from "../entities/menu";
import { Order } from "../entities/order";
import { OrderLine } from "../entities/orderLine";


export class LinesServices {
    async getAllFrom(orderId: number): Promise<OrderLine[]> {
        return await OrderLine.find({
            where: {
                order: { id : orderId }
            }
        })
    }
    async add(newOrderId: number, newMenuId: number, newMultiplicator?: number): Promise<OrderLine> {
        const line = new OrderLine() ;

        const order = await Order.findOneBy({ id: newOrderId })
        if (order) line.order = order ;

        const menu = await Menu.findOneBy({ id: newMenuId })
        if (menu) line.menu = menu ;

        if (newMultiplicator) line.multiplicator = newMultiplicator;
        return await line.save() ;
    }
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
    async delete(id: number): Promise<number> {
        const line = await OrderLine.findOneBy({ id: id })
        line?.remove()
        return line ? 1 : 0;
    }

}