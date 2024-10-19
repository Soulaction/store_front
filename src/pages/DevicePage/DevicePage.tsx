import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {fetchOneDevice} from "../../http/device-http";
import {Device} from "../../model/Device";
import {errorHandler} from "../../utils/utils";
import s from './DevicePage.module.css';
import Button from "../../components/Button/Button";
import {message} from "antd";
import {useAppDispatch} from "../../feature/hooks/hooks";
import {addBasketItems, deleteBasketItems} from "../../feature/basket/basketThunk";


const DevicePage = () => {
    const {id} = useParams();
    let {state: {idBasketItem}} = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [idItemBasket, setIdItemBasket] = useState<string | null>(idBasketItem);
    const [device, setDevice] = useState<Partial<Device>>({info: []});
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchOneDevice(id)
            .then(({data}) => setDevice(data))
            .catch(errorHandler)
    }, [])

    const addInBasket = async (deviceId: string) => {
        await dispatch(addBasketItems(deviceId)).unwrap()
        messageApi.success('Товар добавлен в корзину');
    }

    const deleteFromBasket = async (deviceId: string) => {
        await dispatch(deleteBasketItems(deviceId)).unwrap()
        messageApi.success('Товар удалён из корзины');
        setIdItemBasket(null);
    }

    if (!device.id) {
        return <></>;
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
                        {device.info.length ? device.info.map(item =>
                                <li className={s.descriptionItem} key={item.id}>{`${item.title}: `} <span
                                    className={s.descriptionText}>{item.description}</span></li>
                            )
                            :
                            <h3 className={s.descriptionEmpty}>У товара нет характеристик</h3>
                        }
                    </ul>
                </div>
                <div className={s.dopInfo}>
                    <p className={s.cardPrice}>{device.price + ' ₽'}</p>
                    {idItemBasket ?
                        <Button onClick={() => deleteFromBasket(idItemBasket)}>Удалить из корзины</Button>
                        :
                        <Button onClick={() => addInBasket(device.id)}>Добавить в корзину</Button>
                    }
                </div>
            </div>
        </main>
    )
};

export default DevicePage;
