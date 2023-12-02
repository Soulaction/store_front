import { Container, Row, Card, Table, Button } from 'react-bootstrap'
import ChangeStatus from '../components/modals/ChangeStatus'
import { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { fetchOrders, fetchSendOrders, fetchPaymantOrders, fetchOneOrders } from '../http/orderApi'
import OrderItem from '../components/OrderItem'
import { useHistory } from 'react-router';
import { STORE_KEEPER_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite'

const Keeper = observer (() => {

    const { order } = useContext(Context)
    const history = useHistory()
    const [changeStatusVisible, setStatusVisible] = useState(false)

    useEffect(() => {
        fetchOrders().then(data => order.setOrders(data))
    }, [])

    const allSelect = async () => {
        await fetchOrders().then(data => order.setOrders(data))
        history.push(STORE_KEEPER_ROUTE)
    }

    const paymantSelect = async () => {
        await fetchPaymantOrders().then(data => order.setOrders(data))
        history.push(STORE_KEEPER_ROUTE)
    }

    const sendSelect = async () => {
        await fetchSendOrders().then(data => order.setOrders(data))
        history.push(STORE_KEEPER_ROUTE)
    }

    const seerch = async (id) => {
        await fetchOneOrders(id).then(data => order.setOrders(data))
        history.push(STORE_KEEPER_ROUTE)
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
                                    {order.orders.map((order) => {
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