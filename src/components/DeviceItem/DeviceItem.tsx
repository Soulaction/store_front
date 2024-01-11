import {observer} from "mobx-react-lite"
import {FC, useContext} from "react"
import {ContextApp} from "../../index"
import {DEVICE_ROUTE} from "../AppRouter/consts";
import {useNavigate} from "react-router-dom";
import {Device} from "model/Device";
import {TypeCard} from "../../model/TypeCard";
import s from "./deviceItem.module.css";
import likeIcon from '../../assets/like.svg';
import analysisIcon from '../../assets/analysis.svg';

export interface DeviceItemProps {
    deviceItem: Device,
    type: TypeCard
}

const DeviceItem: FC<DeviceItemProps> = observer(({deviceItem}) => {
    const navigate = useNavigate();

    function dragStartHandler(e, device) {

    }

    function dragEndHandler(e) {

    }

    function dragLeaveHandler(e) {

    }

    function dragOverHandler(e) {

    }

    function dragDropHandler(e, device) {

    }

    return (
        <div className={s.card} onClick={() => navigate(DEVICE_ROUTE + '/' + deviceItem.id)}
             onDrag={e => dragStartHandler(e, deviceItem)}
             onDragLeave={e => dragEndHandler(e)}
             onDragEnd={e => dragLeaveHandler(e)}
             onDragOver={e => dragOverHandler(e)}
             onDrop={e => dragDropHandler(e, deviceItem)}
             draggable={true}>
            <img className={s.cardImg} src={process.env.REACT_APP_API_URL + 'devices/' + deviceItem?.img}
                 alt={'Картинка ' + deviceItem?.name}/>
            <p className={s.cardPrice}>{deviceItem?.price + ' ₽'}</p>
            <a className={s.cardName}>{deviceItem?.name}</a>
            <div className={s.cardFooter}>
                <button className={s.button + ' ' + s.cardBasketButton}>В корзину</button>
                <button className={s.button}>
                    <img className={s.cardIconButton} src={likeIcon} alt="Иконака добавления в избранное"/>
                </button>
                <button className={s.button}>
                    <img className={s.cardIconButton} src={analysisIcon} alt="Иконка сравнения"/>
                </button>
            </div>

        </div>
    )
})

export default DeviceItem;
