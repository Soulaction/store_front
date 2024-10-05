import {$authHost} from "./index";
import {BasketItem} from "../model/BasketItem";

export const fetchBasketProduct = async (idBasket: string) => {
    return await $authHost.get('/basket/' + idBasket);
}

export const addBasket = async (product: BasketItem) => {
    return await $authHost.post('/basket/', product);
}
export const deleteBasket = async (id: string) => {
    return await $authHost.delete('/basket/' + id);
}
