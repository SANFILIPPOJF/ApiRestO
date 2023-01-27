import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { OrderLine } from "./orderLine"


/**
 * Entité pour la table menus
 * 
 * * Colonnes :
 *   * **id**     : *number*        : Identification du menu
 *   * **name**   : *string*        : Nom du menu
 *   * **price**  : *number*        : Prix du menu
 * 
 * * Liaisons :
 *   * **lines**  : *OrderLine[]*   : Liste de lignes de commande liées à ce menu
*/
@Entity("menus")
export class Menu  extends BaseEntity {

    /** identification du menu */
    @PrimaryGeneratedColumn()
    id: number

    /** nom du menu */
    @Column()
    name: string

    /** prix du menu */
    @Column("decimal", { precision: 5, scale: 2 })
    price: number

    /** Liste de ligne de commande lié au menu */
    @OneToMany(() => OrderLine, (line) => line.id)
    lines: OrderLine[]
}