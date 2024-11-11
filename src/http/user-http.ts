import {$authHost} from "./index";
import {AxiosResponse} from "axios";
import {User} from "../model/User";

export const getUser = async (): Promise<AxiosResponse<User>> => {
    return await $authHost.get('/user');
}

export const refresh = async (): Promise<AxiosResponse<{accessToken: string}>> => {
    return await $authHost.get('/refresh');
}
