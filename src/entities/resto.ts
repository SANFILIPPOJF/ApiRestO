import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Resto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string
}