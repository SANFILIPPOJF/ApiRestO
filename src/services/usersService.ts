import { Users } from "../entities/user";
import { AppDataSource } from "../module/clientData";

export class UsersService{
    async getUserByName(name: string): Promise<Users | null>
    {
        const data = await AppDataSource
        .createQueryBuilder(Users, "user")
        .where("name = :name", {name: name})
        .getOne()
        return data
    }

    async addUser(name: string, hash: string)
    {
        const data = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values([
            { name: name, password: hash }
        ])
        .returning("id,name,admin_lvl")
        .execute();
        if(data.raw)
        {
            return data.raw;
        }
        return undefined
    }
}