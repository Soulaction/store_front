import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, FormProps, Input, message, Modal, Table, TableProps, Upload} from "antd";
import {Type} from "../../../../model/Type";
import {UploadFile} from "antd/es/upload/interface";
import s from "../TypeEdit/TypeEdit.module.css";
import {Add, UploadOutlined} from "@mui/icons-material";
import {createType, deleteType, fetchTypes} from "../../../../http/types-http";
import {AxiosError} from "axios/index";

type FieldType = Omit<Type, 'id'>;

export const TypeEdit = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState<Type[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const img = useRef<UploadFile>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const columns: TableProps<Type>['columns'] = [
        {title: 'Наименование', key: 'name', dataIndex: 'name'},
        {title: '', width: 10, render: () => <Button>Редактировать</Button>},
        {
            title: <Button className={s.btnAdd} type="primary" icon={<Add/>}
                           onClick={() => setIsModalOpen(true)}/>,
            width: 5,
            render: (value) => <Button type="primary" danger onClick={() => typeDelete(value.id)}>Удалить</Button>
        }
    ];

    useEffect(() => {
        getTypes();
    }, [])

    const getTypes = (): void => {
        fetchTypes().then(data => setDataSource(data));
    }

    const saveType: FormProps<FieldType>['onFinish'] = (values): void => {
        const formData = new FormData();
        formData.set('name', values.name);
        formData.set('img', img.current as unknown as File);
        createType(formData)
            .then(() => {
                messageApi.success('Тип сохранён');
                setIsModalOpen(false);
            })
    };

    const typeDelete = (id: number): void => {
        deleteType(id)
            .then(() => getTypes())
    }

    const dummyRequest = ({file, onSuccess}: any) => {
        img.current = file;
        onSuccess("ok");
    };

    const resetForm = (): void => {
        form.resetFields();
        img.current = null;
    }

    const closeForm = () => {
        setIsModalOpen(false);
        resetForm();
    }

    return (
        <div>
            {contextHolder}
            <Table dataSource={dataSource}
                   columns={columns}
                   rowKey={(record) => record.id}
                   locale={{emptyText: 'Нет данных'}}/>
            <Modal title="Добавить тип" open={isModalOpen} onCancel={closeForm} footer="">
                <Form form={form}
                      name="basic"
                      onFinish={saveType}
                      autoComplete="off">
                    <Form.Item<FieldType>
                        label="Наименование"
                        name="name"
                        rules={[{required: true, message: 'Заполните поле'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Картинка типа">
                        <Upload customRequest={dummyRequest}
                                fileList={img.current ? [img.current] : []}
                                accept="image/png, image/jpeg"
                                maxCount={1}>
                            <Button icon={<UploadOutlined/>}>Загрузить</Button>
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
