import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { updateStatusPaymant } from "../../http/orderApi";
import { Context } from "../../index"
import { fetchProduct } from "../../http/basketApi";



const PaymantOrder = observer(({ show, onHide, idBasketDevice }) => {

  const { user, basket} = useContext(Context)
  const {id} = useParams();
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)

  function getCheckedCheckBoxes() {
    let checkboxes = document.getElementsByClassName('checkbox1');
    let checkboxesChecked;
    for (let index = 0; index < checkboxes.length; index++) {
      if (checkboxes[index].checked) {
        checkboxesChecked = checkboxes[index].value;
      }
    }
    return checkboxesChecked;
  }


  const updateOrder = () => {

    let paymant = getCheckedCheckBoxes();
    updateStatusPaymant( idBasketDevice, id, paymant ).then(data => { onHide() })
    fetchProduct(user.user.id).then(data => basket.setProducts(data))
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
          <h6>Выберите способ оплаты</h6>
          <input className="checkbox1"
            style={{ marginRight: '5px' }}
            id="check1"
            checked={check1}
            type="checkbox"
            value="true"
            onChange={() => {
              setCheck1(!check1)
              setCheck2(false)}}
            />
          <label for="check1">Банковской картой</label>

          <input className="checkbox1"
            style={{ margin: '0 5px 0 5em' }}
            id="check2"
            checked={check2}
            type="checkbox"
            value="true"
            onChange={() => {
              setCheck2(!check2)
              setCheck1(false)}} />
          <label for="check2">Электронным кошельком</label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={updateOrder}>Оплатить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default PaymantOrder;