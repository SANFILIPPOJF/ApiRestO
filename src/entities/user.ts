import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    adminLvl: number
    
    @OneToMany(() => Order, (order) => order.userId)
    orders: Order[]

}