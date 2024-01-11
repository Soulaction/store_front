import {observer} from "mobx-react-lite"
import {useContext, useState} from "react"
import {ContextApp} from "../index"
import DeviceItem from "./DeviceItem/DeviceItem"
import {TypeCard} from "../model/TypeCard";


const DeviceList = observer(() => {
    const {deviceStore} = useContext(ContextApp);
    const [typeCard, setTypeCard] = useState<TypeCard>('card');
    console.log('DeviceList');

    return (
        <div>
            {deviceStore.devices && deviceStore.devices.map(el => (
                <DeviceItem key={el.id} deviceItem={el} type={typeCard}/>
            ))}
        </div>
    )
})

export default DeviceList;
