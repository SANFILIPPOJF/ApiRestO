//import { Client } from 'pg';        // Client
import * as dotenv from 'dotenv';   // Client
import "reflect-metadata"
import { OrderLine } from '../entities/orderLine';
import { Menu } from '../entities/menu';

import { Order } from '../entities/order';
import { Resto } from '../entities/resto';
import { Users } from '../entities/user';
import { DataSource } from 'typeorm';
dotenv.config()                     // Client


/** Acces au serveur SQL */


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Users,Menu,OrderLine,Order,Resto],
    synchronize: true,
    logging: false,
})