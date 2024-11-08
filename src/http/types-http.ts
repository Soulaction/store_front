import {$serverHost} from "./index";
import {Type} from "../model/Type";
import {AxiosResponse} from "axios";

export const createType = async (type: FormData): Promise<AxiosResponse<Type>> => {
        return await $serverHost.post('/type', type);
}

export const updateType = async (type: FormData): Promise<AxiosResponse<Type>> => {
        return await $serverHost.put('/type', type);
}

export const fetchTypes = async (): Promise<AxiosResponse<Type[]>> => {
    return await $serverHost.get('/type')
}

export const deleteType = async (id: string): Promise<void> => {
    await $serverHost.delete<void>('/type/' + id);
}
