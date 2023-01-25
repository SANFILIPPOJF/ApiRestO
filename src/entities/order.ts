import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"
import { Resto } from "./resto"
import { Users } from "./user"

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default : new Date(),nullable : false})
    created_at: Date

    @Column({ type: 'date', nullable : true })
    served_at: Date | null

    @ManyToOne(() => Users, (user) => user.id)
    user: Users

    @ManyToOne(() => Resto, (resto) => resto.id)
    resto: Resto
    
    @OneToMany(() => OrderLine, (line) => line.order_id)
    lines: OrderLine[]
}