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

}