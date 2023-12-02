import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../../index";
import UpdateItemDevice from "../UpdateItemDevice"
import Pages from "../Pages";

const UpdateInfomationDevice = observer(({ show, onHide }) => {

    const { device } = useContext(Context)

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Список товаров                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {device.devices.map((el) =>  <UpdateItemDevice key={el.id} deviceId={el.id}  device={el}/> )}
            <Pages />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default UpdateInfomationDevice;