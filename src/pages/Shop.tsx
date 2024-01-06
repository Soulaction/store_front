import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import {ContextApp} from "../index";
import DeviceList from "../components/DeviceList";
import NavBar from "../components/NavBar/NavBar";
import {fetchBrands, fetchDevices} from "../http/device-http";
import Pages from "../components/Pages";
import {fetchTypes} from "../http/types-http";

const Shop = observer(() => {
    const {deviceStore, brandsStore, typesStore} = useContext(ContextApp);
    useEffect(() => {
        fetchTypes().then(data => typesStore.setTypes(data))
        fetchBrands().then(data => brandsStore.setBrands(data))
        fetchDevices(null, 1, deviceStore.limit).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })

    }, [])

    // useEffect(() => {
    //     fetchDevices(typesStore.selectedType.id, brandsStore.selectedBrand.id, deviceStore.page, deviceStore.limit).then(data => {
    //         deviceStore.setDevices(data.rows)
    //         deviceStore.setTotalCount(data.count)
    //     })
    // }, [deviceStore.page, typesStore.selectedType, brandsStore.selectedBrand,])

    return (
            <Row>
                <Col md={3}>
                    <NavBar/>
                </Col>

                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
    )
})

export default Shop;
