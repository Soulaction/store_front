import {observer} from "mobx-react-lite";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {ContextApp} from "../../index";
import DeviceList from "../../components/DeviceList/DeviceList";
import {fetchDevices} from "../../http/device-http";
import s from './Shop.module.css';
import {Device} from "../../model/Device";

const Shop = observer(() => {
    const {deviceStore, typesStore} = useContext(ContextApp);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        console.log(typesStore);
        fetchDevices(typesStore.selectedType.id, deviceStore.page, deviceStore.limit).then(({data}) => {
            setDevices(data.rows);
        })
    }, [deviceStore.page])

    const changePage = (event: ChangeEvent, page: number) => {
        deviceStore.setPage(page);
    }

    return (
        <main className={s.main}>

            <div className={s.products}>
                <DeviceList devices={devices} isAdmin={false}/>
            </div>
        </main>
    )
})

export default Shop;
