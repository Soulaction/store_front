import { observer } from "mobx-react-lite"
import {FC, useContext} from "react"
import { Col, Card, Image, Container } from 'react-bootstrap'
import { ContextApp } from "../index"
import addInBasket from "../image/addInBasket.png"
import favorite from "../image/favorite.png"
import {DEVICE_ROUTE} from "./AppRouter/consts";
import {useNavigate} from "react-router-dom";
import {Device} from "../model/Device";

export interface DeviceItemProps {
    deviceItem: Device
}

const DeviceItem: FC<DeviceItemProps> = observer(({deviceItem}) => {
    const navigate = useNavigate();
    const { brandsStore } = useContext(ContextApp);
    const brand = brandsStore.brands.filter((brand) => brand.id == deviceItem.brandId)[0];

    function dragStartHandler(e, device) {

    }

    function dragEndHandler(e) {

    }

    function dragLeaveHandler(e) {

    }

    function dragOverHandler(e) {

    }

    function dragDropHandler(e, device) {

    }

    return (
        <Col md={3} onClick={()=>{
            navigate(DEVICE_ROUTE + '/' + deviceItem.id);
            localStorage.setItem('brand', brand.name);
        }}>
            <Card
                onDrag={e => dragStartHandler(e, deviceItem)}
                onDragLeave={e => dragEndHandler(e)}
                onDragEnd={e => dragLeaveHandler(e)}
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dragDropHandler(e, deviceItem)}
                draggable={true}
            style={{width: 150, cursor: 'pointer', margin: '7px'}} border={"light"}
            >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + deviceItem.img}/>
                <div className="d-flex justify-content-between aling-items-center opacity-75">
                    <div>
                       {brand.name}
                    </div>
                    <div className="d-flex align-items-center">
                        {/* <div className="pe-1">{devices.rating}</div> */}
                        {/* <Image width={15} height={15} src={star}></Image> */}
                    </div>

                </div>
                <div>{deviceItem.name}</div>

                <div style = {{
                    color: "black",
                    fontWeight:"bold"}}
                >
                    {"Цена: " + deviceItem.price + " ₽"}</div>

                <Container>
                    <button
                        style={{
                                background: `url(${addInBasket}) no-repeat center center`,
                                width: 30, height: 30, backgroundSize: 'cover',
                                border: 0, marginRight: '30px'
                        }}

                            type="button"
                        className="btn btn-secondary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Добавить в корзину"
                    >
                    </button>

                    <button
                        style={{
                                background: `url(${favorite}) no-repeat center center`,
                                width: 30, height: 30, backgroundSize: 'cover',
                                border: 0, marginRight: '30px'
                        }}

                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title ="Добавить в избранное"
                    >
                    </button>
                </Container>
            </Card>
        </Col>
    )
})

export default DeviceItem;
