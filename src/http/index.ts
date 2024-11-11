import axios from 'axios'
import {refresh} from "./user-http";

const $serverHost = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_AUTH_URL,
    withCredentials: true,
})

const reqInterceptor = (config) => {
    config.headers.authorization = localStorage.getItem('accessToken');
    return config;
}

const errorInterceptor = async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && originalRequest.url !== '/refresh') {

        try {
            const {data} = await refresh();
            localStorage.setItem('accessToken', data.accessToken);

            return $authHost.request(originalRequest);
        } catch {
        }
    }

    throw error;
};


//Для сервера приложения
$serverHost.interceptors.request.use(reqInterceptor);

$serverHost.interceptors.response.use(
    (response) => response,
    errorInterceptor
);

//Для сервера авторизации
$authHost.interceptors.request.use(reqInterceptor);

$authHost.interceptors.response.use(
    (response) => response,
    errorInterceptor
);

export {
    $serverHost,
    $authHost
}
