import {$authHost, $host} from "./index";
import {Type} from "../model/Type";

export const createType = async (type: FormData): Promise<Type> => {
    const {data} = await $authHost.post<Type>('/type', type)
    return data
}

export const fetchTypes = async (): Promise<Type[]> => {
    const {data} = await $authHost.get<Type[]>('/type')
    return data
}

export const deleteType = async (id: number): Promise<void> => {
    await $authHost.delete<void>('/type/' + id);
}
