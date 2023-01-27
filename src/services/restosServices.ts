import { Resto } from "../entities/resto";

/**
 * Permet la gestion des requetes SQL restos.
 * 
 * * **getAllRestos()**     : Récupération de tous les restos
 * * **getRestoById()**     : Récupération d'un resto par son id
 * * **getRestoByCity()**   : Récupération d'un resto par sa ville
 * * **addResto()**         : Création d'un resto
 * * **edit()**             : MModification d'un resto
 * * **delete()**           : Suppression d'un resto
 */
export class RestosServices {

    /**
     * Récupération de tous les restos
     * @returns     Tous les resto
     */
    async getAllRestos(): Promise<Resto[]> {
        const resto = await Resto.find()
        return resto
    }

    /**
     * Récupération d'un resto par son id
     * @param id    id du resto
     * @returns     Le resto souhaité
     */
    async getRestoById(id: number): Promise<Resto | null> {
        const resto = await Resto.findOneBy({ id: id })
        return resto
    }

    /**
     * Récupération d'un resto par sa ville
     * @param city  Nom de la ville
     * @returns     Le resto souhaité
     */
    async getRestoByCity(city: string): Promise<Resto | null> {
        return await Resto.findOneBy({ city: city })
    }

    /**
     * Création d'un resto
     * @param city  Nom de la ville
     * @returns     Le resto créé
     */
    async addResto(city: string): Promise<Resto> {
        const resto = new Resto();
        resto.city = city;
        return await resto.save();
    }

    /**
     * Modification d'un resto
     * @param id        id du resto
     * @param newCity   nouveau nom de vill
     * @returns         le resto modifié
     */
    async edit(id: number, newCity: string): Promise<Resto | null> {
        const resto = await Resto.findOneBy({ id: id })
        if (resto !== null) {
            resto.city = newCity;
            return await resto.save();
        }
        return null;
    }

    /**
     * Suppression d'un resto
     * @param id        id du resto
     * @returns         1 si la commande à bien été supprimée, sinon 0
     */
    async delete(id: number): Promise<number> {
        const resto = await Resto.findOneBy({ id: id })
        resto?.remove()
        return resto ? 1 : 0;
    }
}