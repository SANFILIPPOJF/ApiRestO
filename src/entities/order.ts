import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"
import { Resto } from "./resto"
import { Users } from "./user"

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default : 1, nullable: false})
    status: number
    /*  0: supprimée annulée ;
        1: en cours ;
        2: validée (par le client);
        3: prise en compte (restaurant);
        4: servie; */

    @Column({default : new Date(),nullable : false})
    created_at: Date

    @Column({ type: 'timestamptz', nullable : true })
    validated_at: Date | null

    @Column({ type: 'timestamptz', nullable : true })
    checked_at: Date | null

    @Column({ type: 'timestamptz', nullable : true })
    served_at: Date | null

    @ManyToOne(() => Users, (user) => user.id)
    user: Users

    @ManyToOne(() => Resto, (resto) => resto.id)
    resto: Resto
    
    @OneToMany(() => OrderLine, (line) => line.order)
    lines: OrderLine[]
}