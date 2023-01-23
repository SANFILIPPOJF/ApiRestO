import { Menu } from "src/entities/menu";
import { AppDataSource } from "src/module/clientData";


export class MenuServices {

    async getAll()
    {
        
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Menu)
        .values([])
        .execute()
    }

    async getById()
    {
        
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Menu)
        .values([])
        .execute()
    }

    async new()
    {
        
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Menu)
        .values([{name : "mayo"}])
        .execute()
    }

    async edit()
    {
        
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Menu)
        .values([{name : "mayo"}])
        .execute()
    }

    async delete()
    {
        
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Menu)
        .values([{name : "mayo"}])
        .execute()
    }

}