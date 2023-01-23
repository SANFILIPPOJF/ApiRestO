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


}