import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { ContextApp } from "../index"
import { Row } from 'react-bootstrap'
import DeviceItem from "./DeviceItem"



const DeviceList = observer(() => {
    const { deviceStore } = useContext(ContextApp)

    return (
        <Row >
            {deviceStore?.devices?.map(el => (
                <DeviceItem key={el.id} deviceItem={el} />
            ))}
        </Row>
    )
})

export default DeviceList;
