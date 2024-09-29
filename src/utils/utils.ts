import {msgShare} from "./share";
export const errorHandler = (error) => {
    const errorInfo = error.response?.data;
    if(!errorInfo) {
        return;
    }
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
}
