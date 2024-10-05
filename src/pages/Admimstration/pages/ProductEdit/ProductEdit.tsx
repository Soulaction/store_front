import React, {useEffect, useState} from 'react';
import s from "./ProductEdit.module.css";
import { PlusOutlined } from '@ant-design/icons';
import {Button, Pagination} from "antd";
import {fetchDevices} from "../../../../http/device-http";
import CreateOrUpdateDevice from "./modals/CreateOrUpdateDevice";
import DeviceList from "../../../../components/DeviceList/DeviceList";
import {fetchTypes} from "../../../../http/types-http";
import {Type} from "../../../../model/Type";
import {Device} from "../../../../model/Device";

export const ProductEdit = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [typeModal, setTypeModal] = useState<'add' | 'update'>();
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

    const refreshData = () => {
        getProduct(selectedTypeId, 1, 10);
        setIsOpenModal(false);
    }

    const openAddModel = (): void => {
        setIsOpenModal(true);
        setTypeModal('add');
    }

    const changePage = (page) => {
        getProduct(selectedTypeId, page, 10);
    }

    return (
        <div className={s.main}>
            <Button className={s.btnAdd}
                    icon={<PlusOutlined/>}
                    type="primary"
                    onClick={openAddModel}/>
            <div className={s.listType}>
                {types.map(type =>
                    <button key={type.id}
                            className={s.btnType + ' ' + (type.id === selectedTypeId && s.btnTypeActive)}
                            onClick={() => setSelectedTypeId(type.id)}>
                        {type.name}
                    </button>)
                }
            </div>
            {!!devices.length ?
                <DeviceList devices={devices} isAdmin={true}/>
                :
                <h2 className={s.notFoundText}>Нет записей</h2>
            }
            {devices.length > 10 && <Pagination locale={{items_per_page: ''}}
                                                onChange={changePage}
                                                defaultCurrent={1}
                                                total={allPage}/>
            }
            {isOpenModal && <CreateOrUpdateDevice typeModal={typeModal}
                                                  hideModal={refreshData}/>}
        </div>
    );
};
