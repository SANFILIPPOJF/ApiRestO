import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./ordeLine"
import { Resto } from "./resto"
import { User } from "./user"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: Date

    @Column()
    servedAt: Date

    @ManyToOne(() => User, (user) => user.id)
    userId: User

    @ManyToOne(() => Resto, (resto) => resto.id)
    restoId: Resto
    
    @OneToMany(() => OrderLine, (line) => line.orderId)
    lines: OrderLine[]
}