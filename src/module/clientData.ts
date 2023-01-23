//import { Client } from 'pg';        // Client
import * as dotenv from 'dotenv';   // Client
import "reflect-metadata"
import { User } from '../entity/user';
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
    entities: [User],
    synchronize: false,
    logging: false,
})