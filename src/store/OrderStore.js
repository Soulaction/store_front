import { makeAutoObservable } from 'mobx'

export default class OrderStore {
    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }

    setOrders(orders){
        this._orders = orders
    }

    get orders(){
        return this._orders
    }

    setPaymantStatus(paymantStatus){
        this._paymantStatus = paymantStatus
    }

    get paymantStatus(){
        return this._paymantStatus
    }

    setOrderStatus(orderStatus){
        this._orderStatus = orderStatus
    }

    get orderStatus(){
        return this._orderStatus
    }

    setCheckOrder(checkOrder){
        this._checkOrder = checkOrder
    }

    get ordercheckOrder(){
        return this._checkOrder
    }
}