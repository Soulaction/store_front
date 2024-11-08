import axios from 'axios'

const $serverHost = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_AUTH_URL
})

const reqInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}

const resInterceptor = (config) => {
    return config;
}

//Для сервера магазина
$serverHost.interceptors.request.use(reqInterceptor);
$serverHost.interceptors.response.use(resInterceptor);


//Для сервера авторизации
$authHost.interceptors.request.use(reqInterceptor);
$authHost.interceptors.response.use(resInterceptor);

export {
    $serverHost,
    $authHost
}
