import { observer } from "mobx-react-lite";
import {FC, useContext} from "react";
import { Modal, Button } from "react-bootstrap";
import { ContextApp } from "../../index";
import UpdateItemDevice from "../UpdateItemDevice"
import Pages from "../Pages";

export interface UpdateInformationDeviceProps {
    show: boolean,
    onHide: () => void
}

const UpdateInformationDevice: FC<UpdateInformationDeviceProps> = observer(({ show, onHide }) => {

    const { deviceStore } = useContext(ContextApp)

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
            {deviceStore.devices.map((el) =>  <UpdateItemDevice key={el.id} device={el}/> )}
            <Pages />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default UpdateInformationDevice;
