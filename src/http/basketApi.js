import {$authHost} from "./index";


export const fetchProduct = async (id) => {
    const {data} = await $authHost.get('api/basket/' + id)
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/device/add', product)
    return data
}
export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}
