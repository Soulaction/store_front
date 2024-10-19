import React, {useEffect} from "react";
import DeviceList from "../../components/DeviceList/DeviceList";
import s from './Shop.module.css';
import {Device} from "../../model/Device";
import {FilterData} from "../../model/programm-types/FilterData";
import FilterProduct from "./components/FilterProduct/FilterProduct";
import {Pagination} from "antd";
import {useAppDispatch, useAppSelector} from "../../feature/hooks/hooks";
import {useParams} from "react-router-dom";
import {setIdType, setPage} from "../../feature/device/deviceSlice";
import {fetchDevicesData} from "../../feature/device/deviceThunk";

const Shop = () => {
    const {idType} = useParams();
    const dispatch = useAppDispatch();
    const devices: Device[] = useAppSelector(state => state.device.devices);
    const filterData: FilterData = useAppSelector(state => state.device.filterData);
    const count: number = useAppSelector(state => state.device.count);

    useEffect(() => {
        dispatch(setIdType(idType));
        dispatch(fetchDevicesData())
    }, [filterData])

    const changePage = (page: number) => {
        dispatch(setPage(page));
    }

    return (
        <main className={s.main}>
            <FilterProduct/>
            <div className={s.products}>
                <DeviceList devices={devices} isAdmin={false}/>
                {count > 10 && <Pagination locale={{items_per_page: ''}}
                                           style={{margin: '15px 0 0 auto', paddingBottom: '25px'}}
                                           onChange={changePage}
                                           defaultCurrent={1}
                                           total={count}/>
                }
            </div>
        </main>
    )
};

export default Shop;
