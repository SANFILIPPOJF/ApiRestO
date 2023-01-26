
import { Users } from "../entities/user";
import { Order } from "../entities/order";
import { Resto } from "../entities/resto";


export class OrdersServices {

    async getAll() : Promise<Order[]>
    {
        const orders = await Order.find(
            {
                relations : { 
                    resto : true,
                    lines : {
                        menu : true
                    }
                }})
        return orders
    }

    async getValidateByRestoId() : Promise<Order[]>
    {
        const orders = await Order.find(
            {

                relations : {
                    user : true ,
                    resto : true,
                    lines : {}
                }
            }
        ) ;
        return orders
    }

    async getById(id : number) : Promise<Order | null>
    {
        return await Order.findOneBy({ id: id })
    }

    async new(userId : number,restoId : number) : Promise<Order>
    {
        const order = new Order() ;

        const user = await Users.findOneBy({ id: userId })
        if (user) order.user = user

        const resto = await Resto.findOneBy({ id: userId })
        if (resto) order.resto = resto

        await order.save()
        
        return [ ...await Order.find(
            {
                select : {user : {
                    id : true,
                    name : true ,
                    admin_lvl : true
                }},
                where :{ id: order.id },
                relations : {
                    user : true ,
                    resto : true,
                    lines : true
                }
            })][0]
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