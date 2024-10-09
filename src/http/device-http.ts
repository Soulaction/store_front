import {$authHost} from "./index";
import {AxiosResponse} from "axios/index";
import {Device} from "../model/Device";
import {PaginationDevices} from "../model/PaginationDevices";
import {FilterData} from "../model/programm-types/FilterData";

export const createDevice = async (device): Promise<AxiosResponse<Device>> => {
    return await $authHost.post('/device', device);
}

export const updateDevice = async (device): Promise<AxiosResponse<Device>> => {
    return await $authHost.patch('/device', device);
}

export const fetchDevices = async (filterData: FilterData): Promise<AxiosResponse<PaginationDevices>> => {
    return await $authHost.get('/device', {params: {
            typeId: filterData.typeId
            , brandId: filterData.brandId
            , price: filterData.price
            , name: filterData.name
            , page: filterData.page
            , limit: filterData.limit ?? 10
        }});
}

export const fetchOneDevice = async (id: string): Promise<AxiosResponse<Device>> => {
    return await $authHost.get('/device/' + id);
}

export const deleteDevice = async (id: string): Promise<void> => {
    await $authHost.delete('/device/' + id);
}
