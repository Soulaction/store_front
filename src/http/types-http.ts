import {$authHost, $host} from "./index";
import {Type} from "../model/Type";

export const createType = async (type) => {
    const {data} = await $authHost.post<Type>('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get<Type[]>('api/type')
    return data
}
