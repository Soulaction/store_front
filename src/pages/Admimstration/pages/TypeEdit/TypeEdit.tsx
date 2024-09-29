import React, {useEffect, useState} from 'react';
import {Button, Form, FormProps, Input, message, Modal, Popconfirm, Table, TableProps, Upload} from "antd";
import {Type} from "../../../../model/Type";
import {UploadFile} from "antd/es/upload/interface";
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import {createType, deleteType, fetchTypes, updateType} from "../../../../http/types-http";
import {errorHandler} from "../../../../utils/utils";
import s from "../TypeEdit/TypeEdit.module.css";


export const TypeEdit = () => {
    const [form] = Form.useForm<Type>();
    const [dataSource, setDataSource] = useState<Type[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddModal, setIsAddModal] = useState<boolean>(true);
    const [img, setImg] = useState<UploadFile>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const columns: TableProps<Type>['columns'] = [
        {title: 'Наименование типа товара', key: 'name', dataIndex: 'name'},
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
        getTypes();
    }, [])

    const getTypes = (): void => {
        fetchTypes().then(({data}) => setDataSource(data));
    }

    const addType: FormProps<Type>['onFinish'] = (values): void => {
        if (!img) {
            messageApi.error('Поле \"Картинка типа\" обязательно для заполнения');
            return;
        }
        const formData = buildFormData(values);
        createType(formData)
            .then(() => {
                messageApi.success('Тип сохранён');
                closeForm();
                getTypes();
            })
            .catch(errorHandler)
    };

    const refreshType: FormProps<Type>['onFinish'] = (values): void => {
        const formData = buildFormData(values);
        formData.set('id', form.getFieldValue('id'));
        updateType(formData)
            .then(() => {
                messageApi.success('Тип обновлён');
                closeForm();
                getTypes();
            })
            .catch(errorHandler)
    };

    const buildFormData = (values: Type) => {
        const formData = new FormData();
        formData.set('name', values.name);
        formData.set('img', img as unknown as File);
        return formData;
    }

    const typeDelete = (id: string): void => {
        deleteType(id)
            .then(() => {
                getTypes()
            })
    }

    function openAddModal(): void {
        setIsAddModal(true);
        setIsModalOpen(true);
    }

    const openUpdateModal = (type: Type): void => {
        form.setFieldsValue({
            id: type.id,
            name: type.name,
            img: null,
        });
        setIsAddModal(false);
        setIsModalOpen(true);
    }

    const dummyRequest = ({file, onSuccess}: any) => {
        setImg(file);
        onSuccess("ok");
    };

    const resetForm = (): void => {
        form.resetFields();
        setImg(null);
    }

    const closeForm = () => {
        setIsModalOpen(false);
        resetForm();
    }

    const confirm = (id: string) => {
        typeDelete(id);
    };

    return (
        <div>
            {contextHolder}
            <Table dataSource={dataSource}
                   columns={columns}
                   rowKey={(record) => record.id}
                   locale={{emptyText: 'Нет данных'}}/>
            <Modal title={isAddModal ? "Добавить тип" : "Редактировать тип"} open={isModalOpen} onCancel={closeForm}
                   footer="">
                <Form form={form}
                      name="basic"
                      onFinish={isAddModal ? addType : refreshType}
                      autoComplete="off">
                    <Form.Item<Type>
                        label="Наименование"
                        name="name"
                        rules={[{required: true, message: 'Заполните поле'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Картинка типа">
                        <Upload customRequest={dummyRequest}
                                onRemove={() => setImg(null)}
                                fileList={img ? [img] : []}
                                accept="image/png, image/jpeg"
                                maxCount={1}>
                            <Button icon={<DownloadOutlined/>}>Загрузить</Button>
                        </Upload>
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
