import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode'
import {User} from "../model/User";


export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/authentication')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const createUser = async (email, password, role) => {
    const {data} = await $host.post('api/user/registration', {email, password, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getAllUsers = async () => {
    const {data} = await $host.get<User[]>('api/user/viewUsers');
    return data;
}
