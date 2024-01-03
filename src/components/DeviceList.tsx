import { observer } from "mobx-react-lite"
import {useContext, useEffect, useState} from "react"
import { ContextApp } from "../index"
import { Row } from 'react-bootstrap'
import DeviceItem from "./DeviceItem"
import {Device} from "../model/Device";
import {fetchDevices} from "../http/device-http";



const DeviceList = observer(() => {
    const { typesStore } = useContext(ContextApp);
    const [devices, setDevices] = useState<Device[]>([]);
    console.log('DeviceList', typesStore);

    useEffect(() => {
        fetchDevices(typesStore.selectedType?.id, 1, 10).then(devices => {
            console.log('fetchDevices');
            setDevices(devices.rows);
        }).catch(e => console.log(e));
    }, [typesStore])

    return (
        <Row >
            {devices && devices.map(el => (
                <DeviceItem key={el.id} deviceItem={el} />
            ))}
        </Row>
    )
})

export default DeviceList;
