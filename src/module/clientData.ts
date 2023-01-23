//import { Client } from 'pg';        // Client
import * as dotenv from 'dotenv';   // Client
import "reflect-metadata"
import { Menu } from 'src/entities/menu';
import { OrderLine } from 'src/entities/ordeLine';
import { Order } from 'src/entities/order';
import { Resto } from 'src/entities/resto';
import { User } from 'src/entities/user';
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
    entities: [User,Menu,OrderLine,Order,Resto],
    synchronize: false,
    logging: false,
})