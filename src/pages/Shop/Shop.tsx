import {observer} from "mobx-react-lite";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {ContextApp} from "../../index";
import DeviceList from "../../components/DeviceList/DeviceList";
import {fetchDevices} from "../../http/device-http";
import s from './Shop.module.css';
import {Device} from "../../model/Device";
import {FilterData} from "../../model/programm-types/FilterData";
import FilterProduct from "./components/FilterProduct/FilterProduct";

const Shop = observer(() => {
    const {deviceStore, typesStore} = useContext(ContextApp);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        const filterData: FilterData = {
            typeId: typesStore.selectedType.id,
            page: deviceStore.page,
            limit: deviceStore.limit
        };
        fetchDevices(filterData).then(({data}) => {
            setDevices(data.rows);
        })
    }, [deviceStore.page])

    const changePage = (event: ChangeEvent, page: number) => {
        deviceStore.setPage(page);
    }

    return (
        <main className={s.main}>
            <FilterProduct/>
            <div className={s.products}>
                <DeviceList devices={devices} isAdmin={false}/>
            </div>
        </main>
    )
})

export default Shop;
