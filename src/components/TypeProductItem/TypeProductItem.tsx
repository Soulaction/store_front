import {FC, useContext} from "react";
import {Type} from "../../model/Type";
import {NavLink} from 'react-router-dom'
import s from './TypeProductItem.module.css'
import {ContextApp} from "../../index";
import {PRODUCTS_ROUTE} from "../AppRouter/consts";
import {observer} from "mobx-react-lite";

export interface TypeProductItemType {
    type: Type
}

const TypeProductItem: FC<TypeProductItemType> = observer(({type}) => {

    const {typesStore} = useContext(ContextApp);

    const getProductsByType = (type: Type) => {
        typesStore.setType(type);
    }

    return (
        <NavLink className={s.card} onClick={() => getProductsByType(type)} to={PRODUCTS_ROUTE}>
            <img className={s.imgCard}
                 src={`${process.env.REACT_APP_API_URL.replace('/api', '')}/types/${type?.img}`}
                 alt={`Картинка типа ${type?.name}`}/>
            <h1 className={s.titleCard}>{type?.name}</h1>
        </NavLink>
    )
});

export default TypeProductItem;
