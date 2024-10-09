import React, {useEffect, useState} from 'react';
import {Button, Form, FormProps, Input, InputNumber, Select} from "antd";
import {fetchDevices} from "../../../../http/device-http";
import {errorHandler} from "../../../../utils/utils";
import {fetchBrands} from "../../../../http/brands-http";
import {Brand} from "../../../../model/Brand";
import {FilterData} from "../../../../model/programm-types/FilterData";

const {Option} = Select;

const FilterProduct = () => {
    const [form] = Form.useForm<FilterData>();
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        fetchBrands().then(({data}) => {
            setBrands(data);
        }).catch(errorHandler)
    }, [])

    const search: FormProps<FilterData>['onFinish'] = (values): void => {
        const filterData: FilterData = {
            typeId: '67ab7fe7-4719-4726-8d32-0d0f8ebfa7f5',
            brandId: values.brandId,
            price: values.price,
            name: values.name,
            page: 1,
            limit: 10
        };
        getProduct(filterData);
    };

    const getProduct = (filterData: FilterData) => {
        fetchDevices(filterData)
            .then(({data}) => {
                console.log(data);
            })
            .catch(errorHandler)
    }

    const reset = () => {
        const filterData: FilterData = {
            typeId: '67ab7fe7-4719-4726-8d32-0d0f8ebfa7f5',
            page: 1,
            limit: 10
        };
        getProduct(filterData);
        form.resetFields();
    }

    return (
        <div>
            <Form form={form}
                  name="basic"
                  onFinish={search}
                  autoComplete="off">
                <Form.Item<FilterData>
                    label="Наименование"
                    name="name">
                    <Input/>
                </Form.Item>
                <Form.Item<FilterData>
                    label="Цена до"
                    name="price">
                    <InputNumber/>
                </Form.Item>
                <Form.Item<FilterData>
                    label="Бренд"
                    name="brandId">
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
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button type="primary"
                            style={{marginRight: '10px'}}
                            htmlType="submit">
                        Найти
                    </Button>
                    <Button onClick={reset}>
                        Очистить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FilterProduct;
