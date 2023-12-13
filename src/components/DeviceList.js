import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../index"
import { Row } from 'react-bootstrap'
import DeviceItem from "./DeviceItem"



const DeviceList = observer(() => {
    const { device } = useContext(Context)
    console.log(device.devices);
    return (
        <Row >
            {device?.devices?.map(el => (
                <DeviceItem key={el.id} deviceItem={el} />
            ))}
        </Row>
    )
})

export default DeviceList;
