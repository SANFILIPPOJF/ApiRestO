import { Menu } from "../entities/menu";
import { AppDataSource } from "../module/clientData";


export class MenuServices {

    async getAll() : Promise<Menu[]>
    {
        const menus = await AppDataSource
            .createQueryBuilder(Menu, "menu")
            .cache(true)
            .getMany() ;
        return menus ;
    }

    async getById(id : number) : Promise<Menu>
    {
        const menus = await AppDataSource
            .createQueryBuilder(Menu, "menu")
            .where("menu.id = :menuid", { menuid: id })
            .cache(true)
            .getMany() ;
        return menus[0] ;
    }

    async new( newName : string , newPrice : number) : Promise<Menu>
    {
        const menus = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Menu)
            .values([{name : newName, price: newPrice}])
            .returning("*")
            .execute() ;
        return menus.raw[0] ;
    }

    async edit( id : number , newName? : string , newPrice? : number)
    {
        
        const menus = await AppDataSource
            .createQueryBuilder()
            .update(Menu)
            .where("id = :menuid", { menuid: id })
            .set({name : newName, price: newPrice})
            .returning("*")
            .execute() ;
        return menus.raw[0] ;
    }

    async delete(id : number) : Promise<number>
    {
        const menus = await AppDataSource
            .createQueryBuilder(Menu, "menu")
            .delete()
            .from(Menu)
            .where("id = :menuid", { menuid: id })
            .execute() ;
        
        return menus.affected || 0
    }

}