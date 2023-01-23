import express,{Request,Response} from 'express';
import { MenuServices } from 'src/services/menuServices';
import { Menu } from '../entities/menu';
import { AppDataSource } from '../module/clientData';

const menuServices = new MenuServices()

export class MenusController {
    async getAll(req: Request, res: Response) {
        menuServices.getAll() ;
    }
    async getById(req: Request, res: Response) {
        menuServices.getById() ;
    }

    async new(req: Request, res: Response) {
        menuServices.new() ;
        
    }
    async edit(req: Request, res: Response) {
        menuServices.edit() ;
        
    }
    async delete(req: Request, res: Response) {
        menuServices.delete() ;
        
    }
}