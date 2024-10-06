import {$authHost} from "./index";
import {BasketItemModel} from "../model/BasketItemModel";
import {AxiosResponse} from "axios";

export const fetchBasketProduct = async (idBasket: string): Promise<AxiosResponse<BasketItemModel[]>> => {
    return await $authHost.get('/basket/' + idBasket);
}

export const addBasket = async (product: BasketItemModel): Promise<AxiosResponse<BasketItemModel>> => {
    return await $authHost.post('/basket/', product);
}
export const deleteBasket = async (id: string): Promise<AxiosResponse<void>> => {
    return await $authHost.delete('/basket/' + id);
}
