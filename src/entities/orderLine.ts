import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Menu } from "./menu"
import { Order } from "./order"

@Entity("orderlines")
export class OrderLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1})
    multiplicator: number

    @ManyToOne(() => Order, (order) => order.id)
    order: Order

    @ManyToOne(() => Menu, (menu) => menu.id)
    menu: Menu

}