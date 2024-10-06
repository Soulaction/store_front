import {observer} from "mobx-react-lite";
import React, {FC} from "react";
import {deleteBasket} from "../../../http/basket-http";
import s from "./BasketItem.module.css";
import {BasketItemModel} from "../../../model/BasketItemModel";
import trashIcon from '../../../assets/trash.svg';

export interface BasketItemProps {
    basketItem: BasketItemModel,
    refresh: () => void
}

const BasketItem: FC<BasketItemProps> = observer(({basketItem, refresh}) => {

    const deleteItem = async (id: string) => {
        await deleteBasket(id)
        refresh();
    }

    return (
        <li className={s.item}>
            <img className={s.cardImg}
                 src={process.env.REACT_APP_API_URL.replace('/api', '') + '/devices/' + basketItem.device.img}
                 alt="Картинка товара"/>
            <h2 className={s.cardName}>{basketItem.device.name}</h2>
            <p className={s.cardPrice}>{basketItem.device.price + ' ₽'}</p>
            <button className={s.btn}>
                <img className={s.iconTrash}
                     onClick={() => deleteItem(basketItem.id)}
                     src={trashIcon}
                     alt="Иконка удаления"/>
            </button>
        </li>
    )


})

export default BasketItem;
