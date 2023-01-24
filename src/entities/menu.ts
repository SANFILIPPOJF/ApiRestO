import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"

@Entity()
export class Menu  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("decimal", { precision: 5, scale: 2 })
    price: number
    
    @OneToMany(() => OrderLine, (line) => line.order_id)
    lines: OrderLine[]
}