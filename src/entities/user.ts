import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order"

/**
 * Entité pour la table users
 * 
 * * Colonnes :
 *   * **id**           : *number*  : Identification du user
 *   * **name**         : *string*  : Nom du user
 *   * **password**     : *string*  : Mot de passe du user
 *   * **admin_lvl**    : *number*  : Niveau d'admin du user
 * 
 * * Liaisons :
 *   * **orders**   : *Order[]* : Liste de commandes liées à ce user
*/
@Entity("users")
export class Users extends BaseEntity {

    /** Identification du user */
    @PrimaryGeneratedColumn()
    id: number

    /** Nom du user */
    @Column()
    name: string

    /** Mot de passe du user */
    @Column({select : false})
    password: string

    /**
     * Niveau d'admin du user
     * * 0 : Client
     * * 1 : Caisse
     * * 2 : Admin
     */
    @Column({default: 0})
    admin_lvl: number
    
    /** Liste de commandes liées à ce user */
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

}