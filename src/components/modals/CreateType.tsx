import {FC, useState} from "react";
import { Form, Modal, Button } from "react-bootstrap";
import {createType} from "../../http/types-http";

export interface CreateTypeProps {
  show: boolean,
  onHide: () => void
}

const CreateType: FC<CreateTypeProps> = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addType = () => {
    createType({ name: value }).then(data => {
      setValue('')
      onHide()
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
            Добавить тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              placeholder={"Введите название типа"}
              value={value}
              onChange={e => setValue(e.target.value)}
            >

            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={addType}>Добавить</Button>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  export default CreateType;


