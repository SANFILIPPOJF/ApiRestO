import { Request, Response } from 'express';
import { Responser } from '../module/Responser';
import { faillingId, faillingString } from '../module/faillingTest';
import { RestosServices } from '../services/restosServices';
import { Resto } from '../entities/resto';


const restosServices = new RestosServices();

/**
 * Class permettant le contrôle des données entrantes pour les requête Resto
 * * **.getAll()**    : Récupération de tous les Resto
 * * **.getBy()**     : Récupération d'un Resto avec son id ou son nom
 * * **.getById()**   : Récupération d'un Resto avec son id
 * * **.getByCity()** : Récupération d'un Resto avec son nom
 * * **.add()**       : Création d'un Resto
 * * **.edit()**      : Modification d'un Resto
 * * **.delete()**    : Suppression d'un Resto 
 */
export class RestosController {
    constructor (){
        this.getBy = this.getBy.bind(this)
        this.getById = this.getById.bind(this)
        this.getByCity = this.getByCity.bind(this)
    }

    /** Récupération de tous les Resto */
    async getAll(req: Request, res: Response) {
        const responser = new Responser<Resto[]>(req, res);

        try {
            const data = await restosServices.getAllRestos();

            responser.status = 200;
            responser.message = `Récupération de tous les restos`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Récupération d'un Resto avec son id ou son nom */
    async getBy(req: Request, res: Response) {
        const responser = new Responser<Resto>(req, res);
        const restoParam = req.params.param;

        if (faillingString(restoParam) && faillingId(restoParam)) {
            responser.status = 400;
            responser.message = `${restoParam} n'est pas une chaine de caractere, ni un nombre entier`;
            responser.send();
            return;
        }
        
        try {
            if (faillingId(restoParam)) {
                await this.getByCity(req,res)
            }else{
                await this.getById(req,res)
            }
        } catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Récupération d'un Resto avec son id */
    getById = async (req: Request, res: Response) => {
        const responser = new Responser<Resto>(req, res);
        const restoId = req.params.param;
        
        try {
            const data = await restosServices.getRestoById(Number(restoId));
            console.log(data?.orders);
            
            if (!data) {
                responser.status = 404;
                responser.message = `Ce resto n'existe pas`;
                responser.send();
                return;
            }

            responser.status = 200;
            responser.message = `Récupération du resto ${data.id}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Récupération d'un Resto avec son nom */
    async getByCity(req: Request, res: Response) {
        const responser = new Responser<Resto>(req, res);
        const restoCity = req.params.param;

        try {
            const data = await restosServices.getRestoByCity(String(restoCity));

            if (!data) {
                responser.status = 404;
                responser.message = `Ce resto n'existe pas`;
                responser.send();
                return;
            }

            responser.status = 200;
            responser.message = `Récupération du resto ${data.city}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Création d'un Resto */
    async add(req: Request, res: Response) {
        const responser = new Responser<Resto>(req, res);
        const city = req.body.city;

        if (faillingString(city)) {
            responser.status = 400;
            responser.message = `Structure du body incorrect : { city : string }`;
            responser.send();
        }
        try {
            const data = await restosServices.addResto(city);

            responser.status = 200;
            responser.message = `Création du resto ${data.city}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Modification d'un Resto */
    async edit(req: Request, res: Response) {
        const responser = new Responser<Resto>(req, res);

        const restoId = req.params.id;
        const city = req.body.city;

        if (faillingId(restoId)) {
            responser.status = 400;
            responser.message = `${restoId} n'est pas un nombre entier`;
            responser.send();
            return;
        }

        if (faillingString(city)) {
            responser.status = 400;
            responser.message = `Structure du body incorrect : { city : string }`;
            responser.send();
        }
        try {
            const data = await restosServices.edit(Number(restoId), city);
            if (!data) {
                responser.status = 404;
                responser.message = `Ce resto n'existe pas`;
                responser.send();
                return;
            }

            responser.status = 200;
            responser.message = `Modification du resto ${restoId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }

    /** Suppression d'un Resto */
    async delete(req: Request, res: Response) {
        const responser = new Responser<number>(req, res);

        const restoId = req.params.id;

        if (faillingId(restoId))
        {
            responser.status = 400 ;
            responser.message = `${restoId} n'est pas un nombre entier` ;
            responser.send() ;
            return ;
        } 

        try {
            const data = await restosServices.delete(Number(restoId));
            if (data === 0) 
            {
                responser.status = 404 ;
                responser.message = `Ce resto n'existe pas` ;
                responser.send() ;
                return ;
            } 

            responser.status = 200;
            responser.message = `Suppression du resto ${restoId}`;
            responser.data = data;
            responser.send();
        }
        catch (err: any) {
            console.log(err.stack)
            responser.send();
        }
    }
}