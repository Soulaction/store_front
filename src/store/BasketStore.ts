import { makeAutoObservable } from 'mobx'
import {Device} from "../model/Device";

export default class BasketStore {
    productsUser: Device[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setProductsUser(product: Device[]){
        this.productsUser = product;
    }
}
