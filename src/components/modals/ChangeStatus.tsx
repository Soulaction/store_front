import { useContext, useState } from "react";
import { Form, Modal, Button, Dropdown } from "react-bootstrap";
import { ContextApp } from "../../index";
import { updateOneOrders, fetchOrders } from '../../http/orderApi'
import {useNavigate} from "react-router-dom";
import {STORE_KEEPER_ROUTE} from "../AppRouter/consts";

const ChangeStatus = ({ show, onHide }) => {

    const [id, setID] = useState<number>();
    const [status, setStatus] = useState('');
    const navigate = useNavigate()
    const { orderStore } = useContext(ContextApp)

    const updateOrder = async (id, statusOrder) => {
        await updateOneOrders(id, statusOrder).then(data => onHide())
        fetchOrders().then(data => orderStore.setOrders(data))
        navigate(STORE_KEEPER_ROUTE)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить статус заказа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите номер заказа"}
                        value={id}
                        onChange={(e)=>setID(e.target.value as unknown as number)}
                    />
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>{ status || "Выберите статус"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> setStatus('Отправлено')}>Отправлено</Dropdown.Item>
                        <Dropdown.Item onClick={()=> setStatus('Ожидание формирования')}>Ожидание формирования</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => {updateOrder(id, status)}}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeStatus;
