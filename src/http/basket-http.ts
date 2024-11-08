import {$serverHost} from "./index";
import {BasketItemModel} from "../model/BasketItemModel";
import {AxiosResponse} from "axios";
export type DataBasket = Pick<BasketItemModel, 'userId' | 'deviceId'>;

export const fetchBasketProduct = async (idUser: string): Promise<AxiosResponse<BasketItemModel[]>> => {
    return await $serverHost.get('/basket/' + idUser);
}

export const addBasket = async (product: DataBasket): Promise<AxiosResponse<BasketItemModel>> => {
    return await $serverHost.post('/basket/', product);
}
export const deleteBasket = async (id: string): Promise<AxiosResponse<void>> => {
    return await $serverHost.delete('/basket/' + id);
}
