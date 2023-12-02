import { makeAutoObservable } from 'mobx'

export default class BasketStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }

    setProducts(product){
        this._products = product
    }

    get products(){
        return this._products
    }
}