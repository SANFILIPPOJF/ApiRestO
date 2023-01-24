import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Menu } from "./menu"
import { Order } from "./order"

@Entity()
export class OrderLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    multiplicator: number

    @ManyToOne(() => Order, (order) => order.id)
    order_id: Order

    @ManyToOne(() => Menu, (menu) => menu.id)
    menu_id: Menu

}