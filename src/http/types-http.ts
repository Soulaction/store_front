import {$authHost} from "./index";
import {Type} from "../model/Type";
import {AxiosResponse} from "axios";

export const createType = async (type: FormData): Promise<AxiosResponse<Type>> => {
        return await $authHost.post('/type', type);
}

export const updateType = async (type: FormData): Promise<AxiosResponse<Type>> => {
        return await $authHost.put('/type', type);
}

export const fetchTypes = async (): Promise<AxiosResponse<Type[]>> => {
    return await $authHost.get('/type')
}

export const deleteType = async (id: string): Promise<void> => {
    await $authHost.delete<void>('/type/' + id);
}
