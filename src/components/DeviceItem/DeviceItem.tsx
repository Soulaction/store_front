import {observer} from "mobx-react-lite"
import React, {FC, SyntheticEvent, useState} from "react"
import {PRODUCT_ROUTE} from "../AppRouter/consts";
import {Link} from "react-router-dom";
import {Device} from "model/Device";
import s from "./DeviceItem.module.css";
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import Button from "../Button/Button";
import CreateOrUpdateDevice from "../../pages/Admimstration/pages/ProductEdit/modals/CreateOrUpdateDevice";
import {deleteDevice} from "../../http/device-http";
import {message, Popconfirm} from "antd";
import {errorHandler} from "../../utils/utils";
import {addBasket} from "../../http/basket-http";
import {BasketItemModel} from "../../model/BasketItemModel";

export interface DeviceItemProps {
    deviceItem: Device;
    isAdmin: boolean;
}

const DeviceItem: FC<DeviceItemProps> = observer(({deviceItem, isAdmin}) => {
    const [isEditModal, setIsEditModal] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

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

    const addProductInBasket = (deviceId: string) : void => {
        const productBasket: BasketItemModel = {
            deviceId,
            basketId: 'e2196ee5-b2de-41dd-a941-c4d5a653bc4f'
        };
        addBasket(productBasket).then(() => {
            messageApi.success('Товар добавлен в корзину');
        }).catch(errorHandler)
    }

    const openEditModel = (): void => {
        setIsEditModal(true);
    }

    const deleteProduct = async (id: string): Promise<void> => {
        await deleteDevice(id).then(() => {
            messageApi.success('Товар удалён');
        }).catch(errorHandler);
    }

    return (
        <>
            {contextHolder}
            <div className={s.card}
                 onDrag={e => dragStartHandler(e, deviceItem)}
                 onDragLeave={e => dragEndHandler(e)}
                 onDragEnd={e => dragLeaveHandler(e)}
                 onDragOver={e => dragOverHandler(e)}
                 onDrop={e => dragDropHandler(e, deviceItem)}
                 draggable={true}>
                <img className={s.cardImg}
                     src={process.env.REACT_APP_API_URL.replace('/api', '') + '/devices/' + deviceItem?.img}
                     alt={'Картинка ' + deviceItem?.name}/>
                <Link className={s.cardName} to={PRODUCT_ROUTE + '/' + deviceItem.id}>{deviceItem?.name}</Link>
                <p className={s.cardPrice}>{deviceItem?.price + ' ₽'}</p>
                {isAdmin ?
                    <div className={s.adminBtns}>
                        <button className={s.button} onClick={() => openEditModel()}>
                            <img className={s.cardIconButton} src={editIcon} alt="Иконака редактирования"/>
                        </button>
                        <Popconfirm
                            title="Удалить запись"
                            onConfirm={() => deleteProduct(deviceItem.id)}
                            okText="Да"
                            cancelText="Нет">
                            <button className={s.button}>
                                <img className={s.cardIconButton} src={trashIcon} alt="Иконака удаления"/>
                            </button>
                        </Popconfirm>
                    </div>
                    :
                    <Button className={s.btnBasket} onClick={() => addProductInBasket(deviceItem.id)}>В корзину</Button>
                }
            </div>
            {isEditModal && <CreateOrUpdateDevice selectedDevice={deviceItem}
                                                  typeModal="update"
                                                  hideModal={() => setIsEditModal(false)}/>}
        </>
    )
})

export default DeviceItem;
