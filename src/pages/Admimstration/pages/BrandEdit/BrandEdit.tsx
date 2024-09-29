import React, {useEffect, useState} from 'react';
import {Button, Form, FormProps, Input, message, Modal, Popconfirm, Table, TableProps} from "antd";
import {Brand} from "../../../../model/Brand";
import { PlusOutlined } from '@ant-design/icons';
import {createBrand, deleteBrand, fetchBrands, updateBrand} from "../../../../http/brands-http";
import {errorHandler} from "../../../../utils/utils";
import s from "../BrandEdit/BrandEdit.module.css";


export const BrandEdit = () => {
    const [form] = Form.useForm<Brand>();
    const [dataSource, setDataSource] = useState<Brand[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddModal, setIsAddModal] = useState<boolean>(true);
    const [messageApi, contextHolder] = message.useMessage();

    const columns: TableProps<Brand>['columns'] = [
        {title: 'Наименование бренда', key: 'name', dataIndex: 'name'},
        {
            title: '',
            width: 10,
            render: (value) => <Button onClick={() => openUpdateModal(value)}>Редактировать</Button>
        },
        {
            title: <Button className={s.btnAdd} type="primary" icon={<PlusOutlined/>}
                           onClick={openAddModal}/>,
            width: 5,
            render: (value) =>
                <Popconfirm
                    title="Удалить запись"
                    onConfirm={() => confirm(value.id)}
                    okText="Да"
                    cancelText="Нет">
                    <Button type="primary" danger>Удалить</Button>
                </Popconfirm>
        }
    ];

    useEffect(() => {
        getBrands();
    }, [])

    const getBrands = (): void => {
        fetchBrands().then(({data}) => setDataSource(data));
    }

    const addBrand: FormProps<Brand>['onFinish'] = (values): void => {
        const formData = buildFormData(values);
        createBrand(formData)
            .then(() => {
                messageApi.success('Бренд сохранён');
                closeForm();
                getBrands();
            })
            .catch(errorHandler)
    };

    const refreshBrand: FormProps<Brand>['onFinish'] = (values): void => {
        const formData = buildFormData(values);
        formData.set('id', form.getFieldValue('id'));
        updateBrand(formData)
            .then(() => {
                messageApi.success('Тип обновлён');
                closeForm();
                getBrands();
            })
            .catch(errorHandler)
    };

    const buildFormData = (values: Brand) => {
        const formData = new FormData();
        formData.set('name', values.name);
        return formData;
    }

    const brandDelete = (id: string): void => {
        deleteBrand(id)
            .then(() => {
                getBrands()
            })
    }

    function openAddModal(): void {
        setIsAddModal(true);
        setIsModalOpen(true);
    }

    const openUpdateModal = (brand: Brand): void => {
        form.setFieldsValue({
            id: brand.id,
            name: brand.name
        });
        setIsAddModal(false);
        setIsModalOpen(true);
    }

    const resetForm = (): void => {
        form.resetFields();
    }

    const closeForm = () => {
        setIsModalOpen(false);
        resetForm();
    }

    const confirm = (id: string) => {
        brandDelete(id);
    };

    return (
        <div>
            {contextHolder}
            <Table dataSource={dataSource}
                   columns={columns}
                   rowKey={(record) => record.id}
                   locale={{emptyText: 'Нет данных'}}/>
            <Modal title={isAddModal ? "Добавить бренд" : "Редактировать бренд"} open={isModalOpen} onCancel={closeForm}
                   footer="">
                <Form form={form}
                      name="basic"
                      onFinish={isAddModal ? addBrand : refreshBrand}
                      autoComplete="off">
                    <Form.Item<Brand>
                        label="Наименование"
                        name="name"
                        rules={[{required: true, message: 'Заполните поле'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
