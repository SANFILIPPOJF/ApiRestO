import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

/**
 * Entité pour la table restos
 * 
 * * Colonnes :
 *   * **id**       : *number*  : Identification du resto
 *   * **city**     : *string*  : nom du resto
 * 
 * * Liaisons :
 *   * **orders**   : *Order[]* : Liste de commandes liées à ce resto
*/
@Entity("restos")
export class Resto extends BaseEntity {

    /** Identification du resto */
    @PrimaryGeneratedColumn()
    id: number

    /** nom du resto */
    @Column()
    city: string
    
    /** Liste de commandes liées à ce resto */
    @OneToMany(() => Order, (order) => order.resto)
    orders: Order[]
}