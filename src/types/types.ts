import { Order } from "../entities/order";
import { OrderLine } from "../entities/orderLine";

export type TDataToken = {
    id: number,
    admin_lvl: number,
    name: string,
    token: string
}

export type TDataPartialUser = {
    id: number,
    name: string,
    admin_lvl: number
};

export type TUserData = {
    id: number,
    name: string,
    admin_lvl: number,
    orders: Order[]
};
export type TToken = {
    id: number,
    admin_lvl: number
}