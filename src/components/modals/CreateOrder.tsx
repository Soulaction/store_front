import { observer } from "mobx-react-lite";
import {FC, useContext, useState} from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { createOrder } from "../../http/orderApi";
import { ContextApp } from "../../index"
import { fetchProduct } from '../../http/basketApi'

export interface CreateOrderType {
  show: boolean,
  onHide: () => void,
  idBasketDevice: number,
  idDevice: number
}

const CreateOrder: FC<CreateOrderType> = observer(({ show, onHide, idBasketDevice, idDevice }) => {

  const { id } = useParams();
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const { userStore, basketStore } = useContext(ContextApp)

  function getCheckedCheckBoxes() {
    // let checkboxes = document.getElementsByClassName('checkbox');
    let checkboxesChecked;
    // for (let index = 0; index < checkboxes.length; index++) {
    //   if (checkboxes[index].checked) {
    //     checkboxesChecked = checkboxes[index].value;
    //   }
    // }
    return checkboxesChecked;
  }


  const addOrder = () => {

    let paymant = getCheckedCheckBoxes();
    createOrder(id, idBasketDevice, idDevice, paymant).then(data => { onHide() })
    fetchProduct(userStore.user.id).then(data => basketStore.setProductsUser(data))

  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Оформить заказ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <h6 style={{ marginBottom: '25px' }}>Выберите способ оплаты</h6>
          <input className="checkbox"
            style={{ marginRight: '5px' }}
            id="check1"
            checked={check1}
            type="checkbox"
            value="true"
            onChange={() => {
              setCheck1(!check1)
              setCheck2(false)
            }}
          />
          <label htmlFor="check1">Банковской картой</label>

          <input className="checkbox"
            style={{ margin: '0 5px 0 5em' }}
            id="check2"
            checked={check2}
            type="checkbox"
            value="true"
            onChange={() => {
              setCheck2(!check2)
              setCheck1(false)
            }} />
          <label htmlFor="check2">Электронным кошельком</label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addOrder}>Заказать</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateOrder;
