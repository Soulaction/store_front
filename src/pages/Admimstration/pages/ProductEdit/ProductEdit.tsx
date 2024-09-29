import React, {useEffect, useState} from 'react';
import s from "../TypeEdit/TypeEdit.module.css";
import {Add} from "@mui/icons-material";
import {Button, Pagination} from "antd";
import {fetchDevices} from "../../../../http/device-http";
import CreateOrUpdateDevice from "./modals/CreateOrUpdateDevice";
import DeviceList from "../../../../components/DeviceList";
import {fetchTypes} from "../../../../http/types-http";
import {Type} from "../../../../model/Type";
import {Device} from "../../../../model/Device";

export const ProductEdit = () => {
    const [isAddModal, setIsAddModal] = useState<boolean>();
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
    const [types, setTypes] = useState<Type[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);
    const [allPage, setAllPage] = useState<number>();

    useEffect(() => {
        fetchTypes().then(({data}) => {
            setTypes(data);
            setSelectedTypeId(data[0].id);
        });
    }, [])

    useEffect(() => {
        selectedTypeId && getProduct(selectedTypeId, 1, 10);
    }, [selectedTypeId])

    const getProduct = (typeId: string, page: number, limit: number): void => {
        fetchDevices(typeId, page, limit)
            .then(({data}) => {
                setDevices(data.rows);
                setAllPage(data.count);
            });
    }

    const changePage = (page) => {
        console.log(page);
        getProduct(selectedTypeId, 1, 10);
    }

    return (
        <div>
            <Button className={s.btnAdd}
                    icon={<Add/>}
                    type="primary"
                    onClick={() => setIsAddModal(true)}/>
            {types.map(type => <button onClick={() => setSelectedTypeId(type.id)}>{type.name}</button>)}
            <DeviceList devices={devices}/>
            <Pagination showSizeChanger
                        locale={{items_per_page: ''}}
                        onChange={changePage}
                        defaultCurrent={1}
                        total={100}/>
            {isAddModal && <CreateOrUpdateDevice typeModal="add"
                                                 hideModal={() => setIsAddModal(false)}/>}
        </div>
    );
};
