import React, {useEffect, useState} from "react";
import {useLocation, useParams} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {fetchOneDevice} from "../../http/device-http";
import {Device} from "../../model/Device";
import {errorHandler} from "../../utils/utils";
import s from './DevicePage.module.css';
import Button from "../../components/Button/Button";
import {message} from "antd";
import {addBasket, deleteBasket} from "../../http/basket-http";
import {BasketItemModel} from "../../model/BasketItemModel";


const DevicePage = observer(() => {
    const {id} = useParams();
    const {state: {isAddProduct}} = useLocation();
    const [device, setDevice] = useState<Partial<Device>>({info: []});
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchOneDevice(id)
            .then(({data}) => setDevice(data))
            .catch(errorHandler)
    }, [])

    const addInBasket = (deviceId: string) => {
        const newItemFromBasket: BasketItemModel = {
            basketId: 'e2196ee5-b2de-41dd-a941-c4d5a653bc4f',
            deviceId
        }
        addBasket(newItemFromBasket).then(() => {
            messageApi.success('Товар добавлен в корзину');
        }).catch(errorHandler);
    }

    const deleteFromBasket = (deviceId: string) => {
        deleteBasket(deviceId).then(() => {
            messageApi.success('Товар удалён из корзины');
        }).catch(errorHandler);
    }

    return (
        <main>
            {contextHolder}
            <h1 className={s.title}>{device.name}</h1>
            <div className={s.content}>
                <img className={s.productImg}
                     src={process.env.REACT_APP_API_URL.replace('/api', '') + '/devices/' + device.img}
                     alt="Картинка товара"/>
                <div className={s.descriptionBlock}>
                    <h2 className={s.descriptionTitle}>Характеристики</h2>
                    <ul className={s.descriptionList}>
                        {device.info.map(item =>
                            <li className={s.descriptionItem} key={item.id}>{`${item.title}: `} <span
                                className={s.descriptionText}>{item.description}</span></li>
                        )}
                    </ul>
                </div>
                <div className={s.dopInfo}>
                    <p className={s.cardPrice}>{device.price + ' ₽'}</p>
                    {isAddProduct ?
                        <Button onClick={() => addInBasket(device.id)}>Добавить в корзину</Button>
                        :
                        <Button onClick={() => deleteFromBasket(device.id)}>Удалить из корзины</Button>
                    }
                </div>
            </div>
        </main>
    )
})

export default DevicePage;
