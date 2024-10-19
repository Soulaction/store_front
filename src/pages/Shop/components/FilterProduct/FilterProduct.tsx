import React, {useEffect, useState} from 'react';
import {Button, Form, FormProps, Input, InputNumber, Select} from "antd";
import {errorHandler} from "../../../../utils/utils";
import {fetchBrands} from "../../../../http/brands-http";
import {Brand} from "../../../../model/Brand";
import {FilterData} from "../../../../model/programm-types/FilterData";
import {setFilterData} from "../../../../feature/device/deviceSlice";
import {useAppDispatch, useAppSelector} from "../../../../feature/hooks/hooks";

const {Option} = Select;

const FilterProduct = () => {
    const [form] = Form.useForm<FilterData>();
    const [brands, setBrands] = useState<Brand[]>([]);
    const filterData: FilterData = useAppSelector(state => state.device.filterData)
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchBrands().then(({data}) => {
            setBrands(data);
        }).catch(errorHandler)
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            typeId: filterData.typeId,
            brandId: filterData.brandId,
            price: filterData.price,
            name: filterData.name,
            page: filterData.page,
            limit: filterData.limit
        });
    }, [filterData])

    const search: FormProps<FilterData>['onFinish'] = (values): void => {
        const newFilterData: FilterData = {
            typeId: filterData.typeId,
            brandId: values.brandId,
            price: values.price,
            name: values.name,
            page: 1,
            limit: 10
        };
        dispatch(setFilterData(newFilterData));
    };

    const reset = () => {
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
