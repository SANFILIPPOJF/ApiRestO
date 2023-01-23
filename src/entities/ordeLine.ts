import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    menuId: number

    @Column()
    orderId: number

    @Column()
    multiplicator: number

}