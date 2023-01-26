
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
    /*  0: supprimée annulée ;
        1: en cours ;
        2: validée (par le client);
        3: prise en compte (restaurant);
        4: servie; */
    async edit(id: number, status: number): Promise<Order | null> {
        const order = await Order.findOneBy({ id: id })
        if (order && !order.served_at) {
            switch (status) {
                case 0:
                    order.remove();
                    break;
                case 1:
                    order.status=1;
                    order.validated_at=null;
                    order.checked_at=null;
                    order.save();
                    break;
                case 2:
                    order.status=2;
                    order.validated_at=new Date();
                    order.checked_at=null;
                    order.save();
                    break;
                case 3:
                    order.status=3;
                    order.checked_at=new Date();
                    order.save();
                default:
                    break;
            }
/*             if (status===) {
                order.served_at = new Date()
            } */
/*             else {
                order.served_at = null
            } */
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