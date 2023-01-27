import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"
import { Resto } from "./resto"
import { Users } from "./user"

/**
 * Entité pour la table orders
 * 
 * * Colonnes :
 *   * **id**             : *number*      : Identification de la commande
 *   * **status**         : *number*      : Etat de la commande
 *   * **created_at**     : *Date*        : Date de création de la commande
 *   * **validated_at**   : *Date*        : Date de validation de la commande
 *   * **checked_at**     : *Date*        : Date de prise en compte de la commande
 *   * **served_at**      : *Date*        : Date de livraison de la commande
 * 
 * * Liaisons :
 *   * **user**           : *Users*       : Propriétaire de la commande
 *   * **resto**          : *Resto*       : Resto dans lequel doit étre servi la commande
 *   * **lines**          : *OrderLine[]* : Liste de lignes de commande liées cette commande
*/
@Entity('orders')
export class Order extends BaseEntity {

    /** Identification de la commande */
    @PrimaryGeneratedColumn()
    id: number

    /** 
     * Etat de la commande
     * * 0: supprimée annulée
     * * 1: en cours
     * * 2: validée (par le client)
     * * 3: prise en compte (restaurant)
     * * 4: servie 
     * */
    @Column({default : 1, nullable: false})
    status: number

    /** Date de création de la commande */
    @Column({default : new Date(),nullable : false})
    created_at: Date

    /** Date de validation de la commande */
    @Column({ type: 'timestamptz', nullable : true })
    validated_at: Date | null

    /** Date de prise en compte de la commande */
    @Column({ type: 'timestamptz', nullable : true })
    checked_at: Date | null

    /** Date de livraison de la commande */
    @Column({ type: 'timestamptz', nullable : true })
    served_at: Date | null

    /** Propriétaire de la commande */
    @ManyToOne(() => Users, (user) => user.id)
    user: Users

    /** Resto dans lequel doit étre servi la commande */
    @ManyToOne(() => Resto, (resto) => resto.id)
    resto: Resto
    
    /** Liste de lignes de commande liées cette commande */
    @OneToMany(() => OrderLine, (line) => line.order)
    lines: OrderLine[]
}