import { makeAutoObservable } from 'mobx'
import {Device} from "../model/Device";

export default class OrderStore {
    orders: Device[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setOrders(orders){
        this.orders = orders;
    }
}
