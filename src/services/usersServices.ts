import { Users } from "../entities/user";


export class UsersServices {
    async getUserByName(name: string): Promise<Users | null> {
        return await Users.findOne(
            {
                select : { 
                    id:true, 
                    name :true,
                    admin_lvl : true,
                    password : true
                },
                where : { 
                    name: name 
                }
            })
    }

    async getDataById(){
    
    }

    async addUser(name: string, hash: string) : Promise<Users> {
        const user = new Users();
        user.name = name;
        user.password = hash;
        return await user.save();
    }
}