import {$authHost} from "./index";


export const createOrder = async (userId, basketDeviceId, deviceId, payment) => {
    const {data} = await $authHost.post('api/order', {userId, basketDeviceId, deviceId, payment})
    return data
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/order')
    return data
}

export const fetchPaymantOrders = async () => {
    const {data} = await $authHost.get('api/order/paymant')
    return data
}

export const fetchSendOrders = async () => {
    const {data} = await $authHost.get('api/order/send')
    return data
}

export const fetchOneOrders = async (id) => {
    const {data} = await $authHost.get('api/order/' + id)
    return data
}

export const updateOneOrders = async (id, statusOrder) => {
    const {data} = await $authHost.put('api/order/', {id, statusOrder})
    return data
}

export const fetchDateOne = async (basketDeviceId, userId) => {
    const {data} = await $authHost.get('api/order/status/view', { params: {basketDeviceId, userId}})
    return data
}

export const updateStatusPaymant = async (basketDeviceId, userId, statusPaymant) => {
    const {data} = await $authHost.put('api/order/status/update', {basketDeviceId, userId, statusPaymant})
    return data
}
