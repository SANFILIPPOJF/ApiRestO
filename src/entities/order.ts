import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"
import { Resto } from "./resto"
import { Users } from "./user"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: Date

    @Column()
    servedAt: Date

    @ManyToOne(() => Users, (user) => user.id)
    userId: Users

    @ManyToOne(() => Resto, (resto) => resto.id)
    restoId: Resto
    
    @OneToMany(() => OrderLine, (line) => line.orderId)
    lines: OrderLine[]
}