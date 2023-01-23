import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    menuId: number
/*
    @Column()
    orderId: number
*/
    @Column()
    multiplicator: number

    @ManyToOne(() => Order, (order) => order.id)
    orderId: Order

}