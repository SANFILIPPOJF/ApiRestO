
import { Users } from "../entities/user";
import { Order } from "../entities/order";
import { Resto } from "../entities/resto";
import { OrderLine } from "../entities/orderLine";
import { Menu } from "../entities/menu";


export class OrdersServices {

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
    /*
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

    async onStatus1(userId : number){
        return await Order.findOne(
            {
                relations : { 
                    user : true ,
                    lines : {menu : true}
                },
                where : { 
                    user : {id : userId},
                    status : 1
                }
            }
        )
    }

    async new(userId: number, restoId: number): Promise<Order> {
        const order = new Order();

        const user = await Users.findOneBy({ id: userId })
        if (user) order.user = user

        const resto = await Resto.findOneBy({ id: restoId })
        if (resto) order.resto = resto

        return await order.save()
    }

    async addMenu(userId : number , multiplicator : number , menuId : number) {
        const currentOrder = await this.onStatus1(userId)

        if (currentOrder){
            let add = false
            currentOrder.lines
            .filter(item => item.menu.id === menuId)
            .forEach(item => {
                item.multiplicator += 1
                add = true
            })
            if (!add){
                const newLine = new OrderLine()
                const targetMenu = Menu.findOneBy({id : menuId})
                //////////////////////////////////////////////////
            }
        }
        
    }

    async edit(id: number, served: boolean): Promise<Order | null> {
        const order = await Order.findOneBy({ id: id })
        if (order !== null) {
            if (served) {
                order.served_at = new Date()
            }
            else {
                order.served_at = null
            }
            return await order.save();
        }
        return null;
    }

    async delete(id: number): Promise<number> {
        const order = await Order.findOneBy({ id: id })
        order?.remove()
        return order ? 1 : 0;
    }
}