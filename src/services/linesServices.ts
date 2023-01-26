
import { OrderLine } from "../entities/orderLine";


export class LinesServices {
    async getAllFrom(orderId: number): Promise<OrderLine[]> {
        return await OrderLine.find({
            where: {
                order_id: orderId
            }
        })
    }
    async add(newOrderId: number, newMenuId: number, newMultiplicator?: number): Promise<OrderLine> {
        const line = new OrderLine();
        line.order_id = newOrderId;
        line.menu_id = newMenuId;
        if (newMultiplicator) line.multiplicator = newMultiplicator;
        return await line.save();
    }
    async edit(id: number, newMenuId?: number, newMultiplicator?: number): Promise<OrderLine | null> {
        const line = await OrderLine.findOneBy({ id: id })
        if (line !== null) {
            if (newMenuId) line.menu_id = newMenuId;
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