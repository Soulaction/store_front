import {FC, useContext} from "react";
import {Type} from "../../model/Type";
import {NavLink} from 'react-router-dom'
import s from './TypeProductItem.module.css'
import {PRODUCTS_ROUTE} from "../AppRouter/consts";

export interface TypeProductItemType {
    type: Type
}

const TypeProductItem: FC<TypeProductItemType> = ({type}) => {

    return (
        <NavLink className={s.card} to={PRODUCTS_ROUTE + '/' + type.id}>
            <img className={s.imgCard}
                 src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/types/${type?.img}`}
                 alt={`Картинка типа ${type?.name}`}/>
            <h1 className={s.titleCard}>{type?.name}</h1>
        </NavLink>
    )
};

export default TypeProductItem;
