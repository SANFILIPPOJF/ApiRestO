import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./ordeLine"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number
    
    @OneToMany(() => OrderLine, (line) => line.orderId)
    lines: OrderLine[]
}