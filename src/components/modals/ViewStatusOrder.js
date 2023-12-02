import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { fetchDateOne } from "../../http/orderApi";


const PaymantOrder = ({ show, onHide, idBasketDevice, idUser }) => {

    const [info, setInfo] = useState('');

    const viewStatus = () => {
        fetchDateOne(idBasketDevice, idUser).then(data => {
            setInfo("Статус заказа: " + data.statusOrder)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {info}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="outline-success" onClick={viewStatus}>Посмотреть статус</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PaymantOrder;