import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Menu } from "./menu"
import { Order } from "./order"

/**
 * Entité pour la table orderlines
 * 
 * * Colonnes :
 *   * **id**               : *number*  : Identification de la ligne
 *   * **multiplicator**    : *number*  : Multiplicateur de menu
 * 
 * * Liaisons :
 *   * **order**            : *Order*   : Commande contenant cette ligne
 *   * **menu**             : *Menu*    : Menu correspondant à cette ligne
*/
@Entity("orderlines")
export class OrderLine extends BaseEntity {

    /** Identification de la commande */
    @PrimaryGeneratedColumn()
    id: number

    /** Multiplicateur de menu */
    @Column({default: 0})
    multiplicator: number

    /** Commande contenant cette ligne */
    @ManyToOne(() => Order, (order) => order.id)
    order: Order

    /** Menu correspondant à cette ligne */
    @ManyToOne(() => Menu, (menu) => menu.id)
    menu: Menu

}