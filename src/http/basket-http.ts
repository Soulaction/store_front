import {$authHost} from "./index";
import {BasketItemModel} from "../model/BasketItemModel";
import {AxiosResponse} from "axios";
export type DataBasket = Pick<BasketItemModel, 'id' | 'idBasketItem'>;

export const fetchBasketProduct = async (idBasket: string): Promise<AxiosResponse<BasketItemModel[]>> => {
    return await $authHost.get('/basket/' + idBasket);
}

export const addBasket = async (product: DataBasket): Promise<AxiosResponse<BasketItemModel>> => {
    return await $authHost.post('/basket/', product);
}
export const deleteBasket = async (id: string): Promise<AxiosResponse<void>> => {
    return await $authHost.delete('/basket/' + id);
}
