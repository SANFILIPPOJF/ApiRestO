
import { Menu } from "../entities/menu";


export class MenuServices {

    async getAll() : Promise<Menu[]>
    {
        return await Menu.find()
    }

    async getById(id : number) : Promise<Menu | null>
    {
        return await Menu.findOneBy({ id: id })
    }

    async new( newName : string , newPrice : number) : Promise<Menu>
    {
        const menu = new Menu() ;
        menu.name = newName 
        menu.price = newPrice
        return await menu.save();
    }

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

    async delete(id : number) : Promise<number>
    {
        const menu = await Menu.findOneBy({ id: id })
        menu?.remove()
        return menu ? 1 : 0 ;
    }

}