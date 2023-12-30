import { observer } from "mobx-react-lite";
import {FC, useContext, useEffect, useState} from "react";
import { ContextApp } from "../index";
import { Button } from "react-bootstrap"
import { deleteProduct, fetchProduct } from "../http/basketApi";
import { fetchDateOne } from "../http/orderApi";
import CreateOrder from "./modals/CreateOrder";
import PaymantOrder from "./modals/PaymantOrder";
import ViewStatusOrder from "./modals/ViewStatusOrder";
import {Device} from "../model/Device";

export interface BasketItemProps {
    device: Device,
    key: number | string
}

const BasketItem: FC<BasketItemProps> = observer(({device, key}) => {

    const [changeStatusVisible, setStatusVisible] = useState<boolean>(false);
    const [changePaymant, setPaymant] = useState<boolean>(false);
    const [paymantStatus, setPaymantStatus] = useState<string>('');
    const [statusOrder, setStatusOrder] = useState<boolean>(false);

    const { userStore, deviceStore, basketStore } = useContext(ContextApp);

    const brand = deviceStore.devices.filter((brand) => brand.id == device.brandId)
    const deleteItem = async () => {
        await deleteProduct(device.id)
        fetchProduct(userStore.user.id).then(data => basketStore.setProductsUser(data))
    }

    useEffect(() => {
        fetchDateOne(device.id, userStore.user.id).then(data => {
            data === null ?
                setPaymantStatus(null) :
                setPaymantStatus(data.statusPayment);
        })
    }, [])

    useEffect(() => {
        fetchDateOne(device.id, userStore.user.id).then(data => {
            data === null ?
                setPaymantStatus(null) :
                setPaymantStatus(data.statusPayment);
        })
    }, [basketStore.productsUser])


    console.log(paymantStatus)
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '15px' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src={process.env.REACT_APP_API_URL + device.img} />
                <span>{brand[0].name}  {device.name}</span>
            </div>
            <div>
                {paymantStatus === null ?
                    <Button className="me-2" variant={"success"} onClick={() => setStatusVisible(true)}>Заказать</Button>
                    : paymantStatus === 'Не оплачено' ?
                        <Button className="me-2" variant={"success"} onClick={() => setPaymant(true)}>Оплатить</Button>
                        : <Button className="me-2" variant={"success"} onClick={() => setStatusOrder(true)}>Посмотреть статус</Button>
                }
                <CreateOrder show={changeStatusVisible} onHide={() => setStatusVisible(false)} idBasketDevice={device.id} idDevice={device.id} />
                <PaymantOrder show={changePaymant} onHide={() => setPaymant(false)} idBasketDevice={device.id} />
                <ViewStatusOrder show={statusOrder} onHide={() => setStatusOrder(false)} idBasketDevice={device.id} idUser={userStore.user.id} />
                <Button variant={"danger"}
                    onClick={() => deleteItem()}
                >Удалить из корзины</Button>
            </div>
        </div>
    )


})

export default BasketItem;
