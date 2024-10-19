import DeviceItem from "../DeviceItem/DeviceItem"
import {Device} from "../../model/Device";
import s from './DeviceList.module.css'

interface DeviceListProps {
    devices: Device[];
    isAdmin: boolean;
}


const DeviceList = ({devices, isAdmin}: DeviceListProps) => {

    return (
        <div className={s.devices}>
            {devices && devices.map(el => (
                <DeviceItem key={el.id}
                            deviceItem={el}
                            isAdmin={isAdmin}/>
            ))}
        </div>
    )
}

export default DeviceList;
