import {observer} from "mobx-react-lite"
import DeviceItem from "./DeviceItem/DeviceItem"
import {Device} from "../model/Device";

interface DeviceListProps {
    devices: Device[];
}


const DeviceList = observer(({devices}: DeviceListProps) => {

    return (
        <div>
            {devices && devices.map(el => (
                <DeviceItem key={el.id} deviceItem={el}/>
            ))}
        </div>
    )
})

export default DeviceList;
