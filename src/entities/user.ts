import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column({default: 0})
    admin_lvl: number
    
    @OneToMany(() => Order, (order) => order.user_id)
    orders: Order[]

}