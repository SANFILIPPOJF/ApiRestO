import { Resto } from "../entities/resto";

export class RestosServices {
    async getAllRestos(): Promise<Resto[]> {
        const resto = await Resto.find()
        return resto
    }

    async getRestoById(id: number): Promise<Resto | null> {
        const resto = await Resto.findOneBy({ id: id })
        return resto
    }

    async getRestoByCity(city: string): Promise<Resto | null> {
        return await Resto.findOneBy({ city: city })
    }
    async addResto(city: string): Promise<Resto> {
        const resto = new Resto();
        resto.city = city;
        return await resto.save();
    }

    async edit(id: number, newCity: string): Promise<Resto | null> {
        const resto = await Resto.findOneBy({ id: id })
        if (resto !== null) {
            resto.city = newCity;
            return await resto.save();
        }
        return null;
    }

    async delete(id: number): Promise<number> {
        const resto = await Resto.findOneBy({ id: id })
        resto?.remove()
        return resto ? 1 : 0;
    }
}