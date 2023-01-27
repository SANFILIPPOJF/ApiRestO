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

    async getDataById(userId: number){
        const orders = await Users.findOne(
            {
                relations: {
                    orders:{
                        lines: {menu: true}
                    },
                },
                where : {
                    id : userId
                }
            })
        return orders
    }

    async addUser(name: string, hash: string) : Promise<Users> {
        const user = new Users();
        user.name = name;
        user.password = hash;
        return await user.save();
    }

    async upgradeAdminLvl(userId: number, adminLvl: number) : Promise<Users | null> {
        const user = await Users.findOneBy({ id: userId })
        if (user !== null) {
            user.admin_lvl = adminLvl ;
            await user.save() ;
        }
        return user;
    }
}