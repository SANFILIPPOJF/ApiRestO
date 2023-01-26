import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Menu } from "./menu"
import { Order } from "./order"

@Entity()
export class OrderLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1})
    multiplicator: number

    @ManyToOne(() => Order, (order) => order.id)
    order_id: number

    @ManyToOne(() => Menu, (menu) => menu.id)
    menu_id: number

}