import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Button } from "react-bootstrap"
import { deleteProduct, fetchProduct } from "../http/basketApi";
import { fetchDateOne } from "../http/orderApi";
import CreateOrder from "./modals/CreateOrder";
import PaymantOrder from "./modals/PaymantOrder";
import ViewStatusOrder from "./modals/ViewStatusOrder";


const BasketItem = observer((props) => {


    const [changeStatusVisible, setStatusVisible] = useState();
    const [changePaymant, setPaymant] = useState();
    const [paymantStatus, setPaymantStatus] = useState();
    const [statusOrder, setStatusOrder] = useState();

    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const { basket } = useContext(Context)

    const brand = device.brands.filter((brand) => brand.id == props.devices.brandId)
    const deleteItem = async () => {
        await deleteProduct(props.idDB)
        fetchProduct(user.user.id).then(data => basket.setProducts(data))
    }

    useEffect(() => {
        fetchDateOne(props.idDB, user.user.id).then(data => {
            data === null ?
                setPaymantStatus(null) :
                setPaymantStatus(data.statusPayment);
        })
    }, [])

    useEffect(() => {
        fetchDateOne(props.idDB, user.user.id).then(data => {
            data === null ?
                setPaymantStatus(null) :
                setPaymantStatus(data.statusPayment);
        })
    }, [basket.products])


    console.log(paymantStatus)
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '15px' }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src={process.env.REACT_APP_API_URL + props.devices.img} />
                <span>{brand[0].name}  {props.devices.name}</span>
            </div>
            <div>
                {paymantStatus === null ?
                    <Button className="me-2" variant={"success"} onClick={() => setStatusVisible(true)}>Заказать</Button>
                    : paymantStatus === 'Не оплачено' ?
                        <Button className="me-2" variant={"success"} onClick={() => setPaymant(true)}>Оплатить</Button>
                        : <Button className="me-2" variant={"success"} onClick={() => setStatusOrder(true)}>Посмотреть статус</Button>
                }
                <CreateOrder show={changeStatusVisible} onHide={() => setStatusVisible(false)} idBasketDevice={props.idDB} idDevice={props.devices.id} />
                <PaymantOrder show={changePaymant} onHide={() => setPaymant(false)} idBasketDevice={props.idDB} />
                <ViewStatusOrder show={statusOrder} onHide={() => setStatusOrder(false)} idBasketDevice={props.idDB} idUser={user.user.id} />
                <Button variant={"danger"}
                    onClick={() => deleteItem()}
                >Удалить из корзины</Button>
            </div>
        </div>
    )


})

export default BasketItem;