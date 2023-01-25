
import { Order } from "../entities/order";


export class OrdersServices {

    async getAll() : Promise<Order[]>
    {
        return await Order.find()
    }

    async getById(id : number) : Promise<Order | null>
    {
        return await Order.findOneBy({ id: id })
    }

    async new(userId : number,restoId : number) : Promise<Order>
    {
        const order = new Order() ;
        order.user_id = userId 
        order.resto_id = restoId
        return await order.save();
    }

    async edit( id : number , served : boolean) : Promise<Order | null>
    {
        const order = await Order.findOneBy({ id: id })
        if (order !== null) {
            if (served) {
                order.served_at = new Date() 
            }
            else {
                order.served_at = null
            }
            return await order.save() ;
        }
        return null;
    }

    async delete(id : number) : Promise<number>
    {
        const order = await Order.findOneBy({ id: id })
        order?.remove()
        return order ? 1 : 0 ;
    }
}