import {$authHost, $host} from "./index";
import {AxiosResponse} from "axios/index";
import {Device} from "../model/Device";
import {PaginationDevices} from "../model/PaginationDevices";

export const createDevice = async (device): Promise<AxiosResponse<Device>> => {
    return await $authHost.post('/device', device);
}

export const updateDevice = async (device): Promise<AxiosResponse<Device>> => {
    return await $authHost.patch('/device', device);
}

export const fetchDevices = async (typeId: string, page: number, limit: number = 10): Promise<AxiosResponse<PaginationDevices>> => {
    return await $host.get('/device', {params: {
            typeId, page, limit
        }});
}

export const fetchOneDevice = async (id: string): Promise<AxiosResponse<Device>> => {
    return await $host.get('/device/' + id);
}

export const deleteDevice = async (id: string): Promise<void> => {
    await $authHost.delete('/device/' + id);
}
