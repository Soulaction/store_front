import axios from 'axios'
import {msgShare} from "../utils/share";
import {AxiosError} from "axios/index";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$authHost.interceptors.response.use(config => {
    return config;
});

export {
    $host,
    $authHost
}
