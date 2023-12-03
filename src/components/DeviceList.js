import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../index"
import { Row } from 'react-bootstrap'
import DeviceItem from "./DeviceItem"



const DeviceList = observer(() => {
    const { devices } = useContext(Context)
    console.log(devices);
    return (
        <Row >
            {devices?.devices?.map(el => (
                <DeviceItem key={el.id} device={el} />
            ))}
        </Row>
    )
})

export default DeviceList;
