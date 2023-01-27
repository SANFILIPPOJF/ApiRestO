import { Users } from "../entities/user";


/**
 * Permet la gestion des requetes SQL users.
 * 
 * * **getUserByName()**    : Récupération d'un user par son nom 
 * * **getDataById()**      : Récupération des info d'un users
 * * **addUser()**          : Ajout d'un user
 * * **upgradeAdminLvl()**  : Upgrade d'un user
 */
export class UsersServices {

    /**
     * Récupération d'un user par son nom **ATTENTION : contient le password**
     * @param name 
     * @returns 
     */
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

    /**
     * Récupération des info d'un users
     * @param userId    id du user
     * @returns         Le user avec ses commandes
     */
    async getDataById(userId: number){
        const user = await Users.findOne(
            {
                relations: {
                    orders:{
                        lines: {menu: true},
                        resto: true
                    },
                },
                where : {
                    id : userId
                }
            })
        return user
    }

    /**
     * Ajout d'un user
     * @param name  nom du user
     * @param hash  mot de pass hacher
     * @returns     Le nouveau user
     */
    async addUser(name: string, hash: string) : Promise<Users> {
        const user = new Users();
        user.name = name;
        user.password = hash;
        return await user.save();
    }

    /**
     * Upgrade d'un user
     * @param userId    id du user
     * @param adminLvl  nouveau niveau d'admin
     * @returns         le user modifié
     */
    async upgradeAdminLvl(userId: number, adminLvl: number) : Promise<Users | null> {
        const user = await Users.findOneBy({ id: userId })
        if (user !== null) {
            user.admin_lvl = adminLvl ;
            await user.save() ;
        }
        return user;
    }
}