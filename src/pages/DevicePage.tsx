import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from "../http/device-http";
import { ContextApp } from "../index";
import { createProduct } from "../http/basketApi";
import { observer } from "mobx-react-lite";
import {Device} from "../model/Device";


const DevicePage = observer(() => {
    const { userStore } = useContext(ContextApp)
    const [deviceNew, setDeviceNew] = useState<Partial<Device>>({id: 0, img: 0, name: "", price: 0, rating: 0, info: [] })
    const { id } = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDeviceNew(data) )
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + deviceNew.img}></Image>
                </Col>
                {/* <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 250, height: 270, backgroundSize: 'cover', fontSize: 64 }}

                        >{device.rating}</div>
                    </Row>
                </Col> */}
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: "5px solid lightgray" }}
                    >
                        <h2>{`${localStorage.getItem('brand')} ${deviceNew.name}`}</h2>
                        <h3>{deviceNew.price} руб</h3>
                        {userStore.isAuth ? <Button variant={"outline-dark"}
                            onClick={() => createProduct({ basketId: userStore.user.id, deviceId: id })}
                        >Добавить в корзину</Button> :
                            <div style={{ textAlign: 'center', fontSize: "20px" }}>Зарегестрируйтесь, либо войдите, чтобы купить</div>
                        }

                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <h1>Характеристики</h1>
                {deviceNew.info.map((info) =>
                    <Row key={info.id}>
                        {info.title}: {info.discription}
                    </Row>
                )
                }
            </Row>
        </Container >
    )
})

export default DevicePage;
