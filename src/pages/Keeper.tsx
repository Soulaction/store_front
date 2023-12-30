import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import ChangeStatus from '../components/modals/ChangeStatus'
import {useContext, useEffect, useState} from 'react';
import {ContextApp} from '../index';
import {fetchOneOrders, fetchOrders, fetchPaymantOrders, fetchSendOrders} from '../http/orderApi'
import OrderItem from '../components/OrderItem'
import {observer} from 'mobx-react-lite'
import {useNavigate} from "react-router-dom";
import {STORE_KEEPER_ROUTE} from "../components/AppRouter/consts";

const Keeper = observer (() => {

    const { orderStore } = useContext(ContextApp)
    const navigate = useNavigate()
    const [changeStatusVisible, setStatusVisible] = useState(false)

    useEffect(() => {
        fetchOrders().then(data => orderStore.setOrders(data))
    }, [])

    const allSelect = async () => {
        await fetchOrders().then(data => orderStore.setOrders(data))
        navigate(STORE_KEEPER_ROUTE)
    }

    const paymantSelect = async () => {
        await fetchPaymantOrders().then(data => orderStore.setOrders(data))
        navigate(STORE_KEEPER_ROUTE)
    }

    const sendSelect = async () => {
        await fetchSendOrders().then(data => orderStore.setOrders(data))
        navigate(STORE_KEEPER_ROUTE)
    }

    const seerch = async (id) => {
        await fetchOneOrders(id).then(data => orderStore.setOrders(data))
        navigate(STORE_KEEPER_ROUTE)
    }

    return (
        <Container className="mt-3">
            <div className="d-flex mb-4">
                <input className="me-3 ps-2" type="number" placeholder="Поиск..." onChange={(e) => seerch(e.target.value)}/>
                <Button className="me-1" variant="success" onClick={() => paymantSelect()}>Оплачены</Button>
                <Button className="me-1" variant="success" onClick={() => sendSelect()}>Отправленные</Button>
                <Button variant="success" onClick={() => allSelect()}>Все заказы</Button>
            </div>
            <Row >
                    <h1 style={{ fontSize: "2rem" }}>Заказы</h1>
                    <Card>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr >
                                        <th>Номер заказа</th>
                                        <th>Название товара</th>
                                        <th>Статус оплаты</th>
                                        <th>Статус заказа</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderStore.orders.map((order) => {
                                        return (
                                            <OrderItem onClick={()=> alert("click")} order={order}/>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                    <Button
                        className="mt-3"
                        variant="outline-primary"
                        onClick={() => setStatusVisible(true)}>
                        Изменить статус
                    </Button>

                    <ChangeStatus show={changeStatusVisible} onHide={() => setStatusVisible(false)} />

            </Row>
        </Container>
    )
})

export default Keeper;
