import React, {FC} from "react";
import s from "./BasketItem.module.css";
import {BasketItemModel} from "../../../model/BasketItemModel";
import trashIcon from '../../../assets/trash.svg';
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../components/AppRouter/consts";
import {message} from "antd";
import {deleteBasketItems} from "../../../feature/basket/basketThunk";
import {useAppDispatch} from "../../../feature/hooks/hooks";

export interface BasketItemProps {
    basketItem: BasketItemModel
}

const BasketItem: FC<BasketItemProps> = ({basketItem}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const deleteItem = async (id: string) => {
        await dispatch(deleteBasketItems(id)).unwrap();
        messageApi.success('Товар удалён из корзины');
    }

    const openDeviceInfo = (deviceId: string, idBasketItem: string) => {
        navigate(PRODUCT_ROUTE + '/' + deviceId, {state: {idBasketItem}});
    }

    return (
        <li className={s.item}>
            {contextHolder}
            <img className={s.cardImg}
                 src={process.env.REACT_APP_API_SERVER_URL.replace('/api', '') + '/devices/' + basketItem.img}
                 alt="Картинка товара"/>
            <h2 className={s.cardName} onClick={() => openDeviceInfo(basketItem.deviceId, basketItem.id)}>{basketItem.name}</h2>
            <p className={s.cardPrice}>{basketItem.price + ' ₽'}</p>
            <button className={s.btn}>
                <img className={s.iconTrash}
                     onClick={() => deleteItem(basketItem.id)}
                     src={trashIcon}
                     alt="Иконка удаления"/>
            </button>
        </li>
    )
};

export default BasketItem;
