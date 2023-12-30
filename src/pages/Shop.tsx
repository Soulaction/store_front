import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {ContextApp} from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import NavBar from "../components/NavBar/NavBar";
import {fetchTypes, fetchBrands, fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {deviceStore, brandsStore, typesStore} = useContext(ContextApp);
    useEffect(() => {
        fetchTypes().then(data => typesStore.setTypes(data))
        fetchBrands().then(data => brandsStore.setBrands(data))
        fetchDevices(null, null, 1, deviceStore.limit).then(data => {
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
        <Container>
            <Row>
                <Col md={3}>
                    <NavBar/>
                </Col>

                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop;
