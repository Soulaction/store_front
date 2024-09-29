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
    const { id } = useParams()

    useEffect(() => {
        // fetchOneDevice(id).then(data => setDeviceNew(data) )
    }, [])

    return (
        <Container className="mt-3">

        </Container >
    )
})

export default DevicePage;
