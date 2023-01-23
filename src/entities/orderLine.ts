import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Menu } from "./menu"
import { Order } from "./order"

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    multiplicator: number

    @ManyToOne(() => Order, (order) => order.id)
    orderId: Order

    @ManyToOne(() => Menu, (menu) => menu.id)
    menuId: Menu

}