//This component shows a file upload widget, this widget takes only csv files with 1 MB limit.
/**
 * Csv should containe 5 columns: 
 * country: string, max length 80
 * country_code: string, max length 5
 * indicator_name: string, max length 80
 * indicator_code: string, max length 10
 * year_2019: number
 * year_2020: number
 * year_2021: 
 * */

import React, { useState } from "react";
import { Upload, message, Button, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import CustomLayout from "./Layout";
import DataTable from "./DataTable";

const UploadFile = () => {
    const [file, setFile] = useState(null);

    const uploadProps = {
        name: 'file',
        accept: '.csv',
        beforeUpload: file => {
            setFile(file);
            return false;
        },
        onChange: info => {
            console.log(info.fileList);
        },
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://127.0.0.1:8000/api/upload', formData)
            .then(res => {
                message.success('File uploaded successfully');
            })
            .catch(err => {
                message.error('File upload failed');
            });
    }

    return (
        <CustomLayout>
            <div style={{ marginTop: 50 }}>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Click to Upload File</Button>
                </Upload>
                <Button type="primary" onClick={uploadFile} style={{ marginTop: 16 }} disabled={!file}>Upload</Button>
                <Divider plain>Country & GDP</Divider>
                {
                    <DataTable />
                }
            </div>
            
        </CustomLayout>
    );
}

export default UploadFile;