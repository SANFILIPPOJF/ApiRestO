import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

@Entity("users")
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({select : false})
    password: string

    @Column({default: 0})
    admin_lvl: number
    /**
     * 0 : Client
     * 1 : Caisse
     * 2 : Admin
     */
    
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

}