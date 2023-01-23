import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    restoId: number

    @Column()
    userId: number

    @Column()
    createdAt: Date

    @Column()
    servedAt: Date
}