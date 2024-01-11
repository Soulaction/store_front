import {observer} from "mobx-react-lite";
import {ChangeEvent, useContext, useEffect} from "react";
import {ContextApp} from "../../index";
import DeviceList from "../../components/DeviceList";
import {fetchDevices} from "../../http/device-http";
import {Pagination} from "@mui/material";
import s from './Shop.module.css';
import './Shop.css';

const Shop = observer(() => {
    const {deviceStore} = useContext(ContextApp);
    useEffect(() => {
        fetchDevices(null, deviceStore.page, deviceStore.limit).then(data => {
            deviceStore.setDevices(data.rows);
            deviceStore.setTotalCount(data.count);
        })
    }, [deviceStore.page])

    const changePage = (event: ChangeEvent, page: number) => {
        deviceStore.setPage(page);
    }

    return (
        <main className={s.main}>
            <form className={s.form}>
                <label>Цена</label>
                <input name="price"
                       type="number"
                       placeholder="Цена"/>
            </form>

            <div className={s.products}>
                <DeviceList/>
                <Pagination count={Math.ceil(deviceStore.totalCount / deviceStore.limit)}
                            color="primary"
                            onChange={changePage}
                            showFirstButton
                            showLastButton/>
            </div>
        </main>
    )
})

export default Shop;
