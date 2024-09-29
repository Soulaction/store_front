import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {createDevice, updateDevice} from "../../../../../http/device-http";
import {Button, Form, Modal, FormProps, Input, message, Select, Upload} from "antd";
import {Type} from "../../../../../model/Type";
import {errorHandler} from "../../../../../utils/utils";
import {Device} from "../../../../../model/Device";
import {UploadFile} from "antd/es/upload/interface";
import {fetchBrands} from "../../../../../http/brands-http";
import {DeviceInfo} from "../../../../../model/DeviceInfo";
import {fetchTypes} from "../../../../../http/types-http";
import {Brand} from "../../../../../model/Brand";
import {DownloadOutlined} from '@ant-design/icons';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import s from './CreateOrUpdateDevice.module.css';

const {Option} = Select;

type OmitProduct = Omit<Device, 'img' | 'info'>

interface CreateOrUpdateDeviceProps {
    typeModal: 'add' | 'update';
    hideModal: () => void;
    selectedDevice?: Device;
}

const CreateOrUpdateDevice = observer(({selectedDevice, typeModal, hideModal}: CreateOrUpdateDeviceProps) => {
    const [form] = Form.useForm<OmitProduct>();
    const [brands, setBrands] = useState<Brand[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [isAddModal, setIsAddModal] = useState<boolean>(true);
    const [img, setImg] = useState<UploadFile>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [info, setInfo] = useState<DeviceInfo[]>(selectedDevice?.info ? selectedDevice.info : []);

    useEffect(() => {
        fetchBrands().then(({data}) => setBrands(data));
        fetchTypes().then(({data}) => setTypes(data));
        if (typeModal === 'update') {
            openUpdateModal(selectedDevice);
        } else {
            openAddModal();
        }
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now().toString()}]);
    }
    const removeInfo = (id: string) => {
        setInfo(info.filter(i => i.id !== id));
    }

    const changeInfo = (id: string, key: string, value) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i));
    }

    const setFormData = (type: OmitProduct) => {
        const formData = new FormData();
        if (typeModal === 'update') {
            formData.append('id', type.id);
        }
        formData.append('name', type.name);
        formData.append('price', `${type.price}`);
        formData.append('img', img as unknown as File);
        formData.append('brandId', type.brandId);
        formData.append('typeId', type.typeId);
        formData.append('info', JSON.stringify(info));
        return formData;
    }

    const addProduct: FormProps<OmitProduct>['onFinish'] = (values): void => {
        createDevice(setFormData(values))
            .then(() => {
                messageApi.success('Товар сохранён');
                closeForm();
            })
            .catch(errorHandler)
    };

    const refreshProduct: FormProps<OmitProduct>['onFinish'] = (values): void => {
        updateDevice(setFormData(values))
            .then(() => {
                messageApi.success('Товар обновлён');
                closeForm();
            })
            .catch(errorHandler)
    };

    const dummyRequest = ({file, onSuccess}: any) => {
        setImg(file);
        onSuccess("ok");
    };

    function openAddModal(): void {
        setIsAddModal(true);
    }

    const openUpdateModal = (device: Device): void => {
        form.setFieldsValue({
            name: device.name,
            price: device.price,
            brandId: device.brandId,
            typeId: device.typeId

        });
        setIsAddModal(false);
    }

    const resetForm = (): void => {
        form.resetFields();
        setImg(null);
    }

    const closeForm = () => {
        resetForm();
        hideModal();
    }

    return (
        <>
            {contextHolder}
            <Modal title={isAddModal ? "Добавить товар" : "Редактировать товар"} open={true} onCancel={closeForm}
                   footer="">
                <Form form={form}
                      name="basic"
                      onFinish={isAddModal ? addProduct : refreshProduct}
                      autoComplete="off">
                    <Form.Item<OmitProduct>
                        label="Наименование"
                        name="name"
                        rules={[{required: true, message: 'Заполните поле'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item<OmitProduct>
                        label="Цена"
                        name="price"
                        rules={[{required: true, message: 'Заполните поле'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item<OmitProduct>
                        label="Бренд"
                        name="brandId"
                        rules={[{required: true, message: 'Заполните поле'}]}>
                        <Select>
                            {brands.map((brand) => (
                                <Option key={brand.id}
                                        value={brand.id}
                                        label={brand.name}>
                                    {brand.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item<OmitProduct>
                        label="Тип"
                        name="typeId"
                        rules={[{required: true, message: 'Заполните поле'}]}>
                        <Select>
                            {types.map((type) => (
                                <Option key={type.id}
                                        value={type.id}
                                        label={type.name}>
                                    {type.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Картинка товара">
                        <Upload customRequest={dummyRequest}
                                onRemove={() => setImg(null)}
                                fileList={img ? [img] : []}
                                accept="image/png, image/jpeg"
                                maxCount={1}>
                            <Button icon={<DownloadOutlined/>}>Загрузить</Button>
                        </Upload>
                    </Form.Item>
                    <div className={s.description}>
                        <h2 className={s.descriptionTitle}>Параметры товара</h2>
                        <Button className={s.btnAdd}
                                icon={<PlusOutlined/>}
                                type="primary"
                                onClick={addInfo}/>
                    </div>
                    {info.map(el =>
                        <div className={s.descriptionItem} key={el.id}>
                            <Input rootClassName={s.descriptionInput} onChange={(e) => changeInfo(el.id, 'title', e.target.value)}/>
                            <Input rootClassName={s.descriptionInput} onChange={(e) => changeInfo(el.id, 'description', e.target.value)}/>
                            <Button className={s.btnAdd}
                                    icon={<MinusOutlined/>}
                                    type="primary"
                                    danger
                                    onClick={() => removeInfo(el.id)}/>
                        </div>
                    )}

                    <Form.Item>
                        <Button className={s.btnAdd}
                                type="primary"
                                htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
})

export default CreateOrUpdateDevice;


