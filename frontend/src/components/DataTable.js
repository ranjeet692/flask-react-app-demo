// This component displays a data grid, which is a table with pagination, sorting, and filtering features. It also has a button to download the data in CSV format.
// User can edit a record by clicking on the edit icon in the last column of the table. This will open a modal dialog with the record details. User can edit the record and save it.

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, InputNumber, Select, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;

const DataTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
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
        }
    ];

    const sample_data = [
        {
            "country": "Uganda",
            "country_code": "UGA",
            "id": 1,
            "indicator_code": "NY.GDP.PCAP.CD",
            "indicator_name": "GDP per capita (current US$)",
            "year_2019": 823.1389505,
            "year_2020": 846.7672013,
            "year_2021": 883.8920323
        },
        {
            "country": "Ukraine",
            "country_code": "UKR",
            "id": 2,
            "indicator_code": "NY.GDP.PCAP.CD",
            "indicator_name": "GDP per capita (current US$)",
            "year_2019": 3661.456299,
            "year_2020": 3751.740723,
            "year_2021": 4835.571777
        },
        {
            "country": "Uruguay",
            "country_code": "URY",
            "id": 3,
            "indicator_code": "NY.GDP.PCAP.CD",
            "indicator_name": "GDP per capita (current US$)",
            "year_2019": 17859.9315,
            "year_2020": 15619.54266,
            "year_2021": 17313.18835
        }
    ];

    // On clicking the edit icon, this function is called to open the modal dialog which is EditRecord component.
    const showModal = (record) => {
        setVisible(true);
        setRecord(record);
    };

    // Handle the cancel button click of the modal dialog.
    const handleModalCancel = () => {
        setVisible(false);
    };

    // Handle the save button click of the modal dialog.
    const handleModalOk = () => {
        setVisible(false);
        fetchData();
    };

    const onFinish = values => {
        console.log(values);
        setLoading(true);
        axios.put(`http://127.0.0.1:8000/api/gdp/${record.id}`, values)
            .then(res => {
                message.success('Record updated successfully');
                handleModalOk();
            })
            .catch(err => {
                message.error('Record update failed');
                setLoading(false);
            });
    };


    // This function fetches the data from the backend API.
    const fetchData = () => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/gdp',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(res => {
                console.log(typeof res.data);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            <Modal
                open={visible}
                title="Edit Record"
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={[
                ]}
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
                    labelCol={{
                        span: 6,
                      }}
                      wrapperCol={{
                        span: 12,
                      }}
                      layout="horizontal"
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
                        <Input disabled/>
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
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="indicator_name"
                        label="Indicator Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input indicator name',
                            },
                        ]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="indicator_code"
                        label="Indicator Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input indicator code',
                            },
                        ]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="year_2019"
                        label="2019"
                        rules={[
                            {
                                required: true,
                                message: 'Please input 2019 value',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="year_2020"
                        label="2020"
                        rules={[
                            {
                                required: true,
                                message: 'Please input 2020 value',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="year_2021"
                        label="2021"
                        rules={[
                            {
                                required: true,
                                message: 'Please input 2021 value',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default DataTable;