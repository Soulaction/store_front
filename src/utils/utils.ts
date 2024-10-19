import {msgShare} from "./share";

export const errorHandler = (error): string => {
    const errorInfo = error.response?.data;
    if (!errorInfo) {
        return '';
    }
    let errorMsg = '';
    if (errorInfo instanceof Object) {
        errorMsg = (errorInfo as Error).message;
        msgShare.publish(errorMsg);
    } else {
        const status: number = error.response.status;
        if (status === 400) {
            errorMsg = 'Ошибка запроса';
            msgShare.publish(errorMsg);

        } else if (status === 404) {
            errorMsg = 'Метод не найден';
            msgShare.publish(errorMsg);

        } else if (status === 500) {
            errorMsg = 'Ошибка сервера';
            msgShare.publish(errorMsg);

        } else {
            errorMsg = 'Неизвестная ошибка';
            msgShare.publish(errorMsg);
        }
    }
    return errorMsg;
}
