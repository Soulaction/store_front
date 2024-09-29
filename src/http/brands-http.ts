import {$authHost} from "./index";
import {AxiosResponse} from "axios";
import {Brand} from "../model/Brand";

export const createBrand = async (brand: FormData): Promise<AxiosResponse<Brand>> => {
        return await $authHost.post('/brand', brand);
}

export const updateBrand = async (brand: FormData): Promise<AxiosResponse<Brand>> => {
        return await $authHost.put('/brand', brand);
}

export const fetchBrands = async (): Promise<AxiosResponse<Brand[]>> => {
    return await $authHost.get('/brand')
}

export const deleteBrand = async (id: string): Promise<void> => {
    await $authHost.delete<void>('/brand/' + id);
}
