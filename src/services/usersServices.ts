import { Users } from "../entities/user";
import { AppDataSource } from "../module/clientData";

export class UsersServices {
    async getUserByName(name: string): Promise<Users | null> {
        return await Users.findOneBy({ name: name })
    }

    async addUser(name: string, hash: string) : Promise<Users> {
        const user = new Users();
        user.name = name;
        user.password = hash;
        return await user.save();
    }
}