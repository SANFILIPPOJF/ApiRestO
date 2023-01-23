import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    restoId: number
/*
    @Column()
    userId: number
*/
    @Column()
    createdAt: Date

    @Column()
    servedAt: Date

    @ManyToOne(() => User, (user) => user.id)
    userId: User
}