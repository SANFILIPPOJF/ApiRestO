
import { Menu } from "../entities/menu";


/**
 * Permet la gestion des requetes SQL orderlines.
 * 
 * * **getAll()**   : Récupération de tous les menus
 * * **getById()**   : Récupération d'un menu
 * * **new()**          : Ajout d'une ligne de commande
 * * **edit()**         : Modification d'une ligne de commande
 * * **delete()**       : Suppression d'une ligne de commande
 */
export class MenuServices {

    /**
     * Récupération de tous les menus
     * @returns     Tous les menus
     */
    async getAll() : Promise<Menu[]>
    {
        return await Menu.find()
    }

    /**
     * Récupération d'un menu
     * @param id    id du menu
     * @returns     le menu souhaité
     */
    async getById(id : number) : Promise<Menu | null>
    {
        return await Menu.findOneBy({ id: id })
    }

    /**
     * Création d'un menu
     * @param newName   Nom du nemu
     * @param newPrice  Prix du menu
     * @returns         Le nouveau menu
     */
    async new( newName : string , newPrice : number) : Promise<Menu>
    {
        const menu = new Menu() ;
        menu.name = newName 
        menu.price = newPrice
        return await menu.save();
    }

    /**
     * Modification d'un menu
     * @param id        l'id du menu à modifier
     * @param newName   le nouveau nom du menu
     * @param newPrice  le nouveau prix du menu
     * @returns         le menu modifié
     */
    async edit( id : number , newName? : string , newPrice? : number) : Promise<Menu | null>
    {
        const menu = await Menu.findOneBy({ id: id })
        if (menu !== null) {
            
            if (newName) menu.name = newName ;
            if (newPrice) menu.price = newPrice ;
            return await menu.save() ;
        }
        return null;
    }

    /**
     * Suppression d'un menu
     * @param id    l'id du menu à supprimer
     * @returns     1 si le menu à bien été supprimée, sinon 0
     */
    async delete(id : number) : Promise<number>
    {
        const menu = await Menu.findOneBy({ id: id })
        menu?.remove()
        return menu ? 1 : 0 ;
    }

}