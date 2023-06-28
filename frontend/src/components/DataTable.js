// This component displays a data grid, which is a table with pagination, sorting, and filtering features. It also has a button to download the data in CSV format.
// User can edit a record by clicking on the edit icon in the last column of the table. This will open a modal dialog with the record details. User can edit the record and save it.

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import CustomLayout from "./Layout";

const { Option } = Select;

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [record, setRecord] = useState(null);

    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => a.country.localeCompare(b.country),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Country Code',
            dataIndex: 'country_code',
            key: 'country_code',
            sorter: (a, b) => a.country_code.localeCompare(b.country_code),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Indicator Name',
            dataIndex: 'indicator_name',
            key: 'indicator_name',
            sorter: (a, b) => a.indicator_name.localeCompare(b.indicator_name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Indicator Code',
            dataIndex: 'indicator_code',
            key: 'indicator_code',
            sorter: (a, b) => a.indicator_code.localeCompare(b.indicator_code),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '2019',
            dataIndex: 'year_2019',
            key: 'year_2019',
            sorter: (a, b) => a.year_2019 - b.year_2019,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '2020',
            dataIndex: 'year_2020',
            key: 'year_2020',
            sorter: (a, b) => a.year_2020 - b.year_2020,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '2021',
            dataIndex: 'year_2021',
            key: 'year_2021',
            sorter: (a, b) => a.year_2021 - b.year_2021,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <EditOutlined onClick={() => showModal(record)} />
            ),
        },
    ];

    const showModal = (record) => {
        setRecord(record);
        setVisible(true);
    }

    const handleOk = () => {
        form.submit();
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const onFinish = (values) => {
        setLoading(true);
        axios.put(`http://localhost:5000/api/update-record/${record.id}`, values)
            .then(res => {
                message.success('Record updated successfully');
                setVisible(false);
                setLoading(false);
                fetchData();
            })
            .catch(err => {
                message.error('Record update failed');
                setLoading(false);
            });
    }

    const fetchData = () => {
        setLoading(true);
        axios.get('http://localhost:5000/api/get-data')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }
        , []);

    return (
        <div>
            <CustomLayout>
                <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            </CustomLayout>
            <Modal
                title="Edit Record"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >

                <Form
                    form={form}
                    name="edit-record"
                    onFinish={onFinish}
                    initialValues={{
                        country: record ? record.country : '',
                        country_code: record ? record.country_code : '',
                        indicator_name: record ? record.indicator_name : '',
                        indicator_code: record ? record.indicator_code : '',
                        year_2019: record ? record.year_2019 : '',
                        year_2020: record ? record.year_2020 : '',
                        year_2021: record ? record.year_2021 : '',
                    }}
                >
                    <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input country name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="country_code"
                        label="Country Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input country code',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default DataTable;