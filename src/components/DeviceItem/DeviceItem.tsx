import {observer} from "mobx-react-lite"
import React, {FC, useState} from "react"
import {PRODUCT_ROUTE} from "../AppRouter/consts";
import {useNavigate} from "react-router-dom";
import {Device} from "model/Device";
import s from "./DeviceItem.module.css";
import editIcon from '../../assets/edit.svg';
import Button from "../Button/Button";
import CreateOrUpdateDevice from "../../pages/Admimstration/pages/ProductEdit/modals/CreateOrUpdateDevice";

export interface DeviceItemProps {
    deviceItem: Device
}

const DeviceItem: FC<DeviceItemProps> = observer(({deviceItem}) => {
    const navigate = useNavigate();
    const [isAddModal, setIsAddModal] = useState<boolean>(false);

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
        <>
            <div className={s.card} onClick={() => navigate(PRODUCT_ROUTE + '/' + deviceItem.id)}
                 onDrag={e => dragStartHandler(e, deviceItem)}
                 onDragLeave={e => dragEndHandler(e)}
                 onDragEnd={e => dragLeaveHandler(e)}
                 onDragOver={e => dragOverHandler(e)}
                 onDrop={e => dragDropHandler(e, deviceItem)}
                 draggable={true}>
                <img className={s.cardImg} src={process.env.REACT_APP_API_URL.replace('/api', '') + '/devices/' + deviceItem?.img}
                     alt={'Картинка ' + deviceItem?.name}/>
                <a className={s.cardName}>{deviceItem?.name}</a>
                <p className={s.cardPrice}>{deviceItem?.price + ' ₽'}</p>
                <div className={s.cardFooter}>
                    <Button>В корзину</Button>
                    <button className={s.button} onClick={() => setIsAddModal(true)}>
                        <img className={s.cardIconButton} src={editIcon} alt="Иконака редактирования"/>
                    </button>
                </div>
            </div>
            {isAddModal && <CreateOrUpdateDevice selectedDevice={deviceItem}
                                                 typeModal="update"
                                                 hideModal={() => setIsAddModal(false)}/>}
        </>
    )
})

export default DeviceItem;
