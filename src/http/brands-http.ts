import {$serverHost} from "./index";
import {AxiosResponse} from "axios";
import {Brand} from "../model/Brand";

export const createBrand = async (brand: FormData): Promise<AxiosResponse<Brand>> => {
        return await $serverHost.post('/brand', brand);
}

export const updateBrand = async (brand: FormData): Promise<AxiosResponse<Brand>> => {
        return await $serverHost.put('/brand', brand);
}

export const fetchBrands = async (): Promise<AxiosResponse<Brand[]>> => {
    return await $serverHost.get('/brand')
}

export const deleteBrand = async (id: string): Promise<void> => {
    await $serverHost.delete<void>('/brand/' + id);
}
