import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

@Entity()
export class Resto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string
    
    @OneToMany(() => Order, (order) => order.resto_id)
    orders: Order[]
}