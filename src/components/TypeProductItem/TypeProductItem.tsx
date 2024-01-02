import {FC} from "react";
import {Type} from "../../model/Type";
import s from './typeProductItem.module.css'

export interface TypeProductItemType {
    type: Type
}

const TypeProductItem: FC<TypeProductItemType> = ({type}) => {
    return (
        <a className={s.card}>
            <img className={s.imgCard}
                 src={`${process.env.REACT_APP_API_URL}types/${type?.img}`}
                 alt={`Картинка типа ${type?.name}`}/>
            <h1 className={s.titleCard}>{type?.name}</h1>
        </a>
    )
}

export default TypeProductItem;
