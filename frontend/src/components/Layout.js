// This is a layout component that is displayed on every page

import React from "react";
import { Layout, Menu } from "antd";
import logo from '../logo.svg'

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: '1',
        label: 'Upload File',
        href: '/'
    },
    {
        key: '2',
        label: 'Data Grid',
        href: '/data-grid'
    }
];

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                {<div className="demo-logo">
                   <img src={logo} alt="Organization Logo" style={{ width: '100%', padding: '16px' }} />
                </div>
                }
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Header>
            <Content style={{ padding: '0 50px', minHeight: '100%' }}>
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2023 Created by Ranjeet Kumar</Footer>
        </Layout>
    );
}

export default CustomLayout;