import {FC, useContext} from "react";
import {Type} from "../../model/Type";
import {NavLink} from 'react-router-dom'
import s from './typeProductItem.module.css'
import {ContextApp} from "../../index";
import {PRODUCT_ROUTE} from "../AppRouter/consts";
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
        <NavLink className={s.card} onClick={() => getProductsByType(type)} to={PRODUCT_ROUTE}>
            <img className={s.imgCard}
                 src={`${process.env.REACT_APP_API_URL}types/${type?.img}`}
                 alt={`Картинка типа ${type?.name}`}/>
            <h1 className={s.titleCard}>{type?.name}</h1>
        </NavLink>
    )
});

export default TypeProductItem;
