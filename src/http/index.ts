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
    },
    (error: AxiosError) => {
        const errorInfo = error.response.data;
        if (errorInfo instanceof Object) {
            msgShare.publish((errorInfo as Error).message);
        } else {
            const status: number = error.response.status;
            if (status === 400) {
                msgShare.publish('Ошибка запроса');
            } else if (status === 404) {
                msgShare.publish('Метод не найден');
            } else if (status === 500) {
                msgShare.publish('Ошибка сервера');
            } else {
                msgShare.publish('Неизвестная ошибка');
            }
        }
    });

export {
    $host,
    $authHost
}
