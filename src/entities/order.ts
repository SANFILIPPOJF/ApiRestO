import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"
import { Resto } from "./resto"
import { Users } from "./user"

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    created_at: Date

    @Column()
    served_at: Date

    @ManyToOne(() => Users, (user) => user.id)
    user_id: Users

    @ManyToOne(() => Resto, (resto) => resto.id)
    resto_id: Resto
    
    @OneToMany(() => OrderLine, (line) => line.order_id)
    lines: OrderLine[]
}