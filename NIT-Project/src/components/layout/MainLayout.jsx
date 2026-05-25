import { useState } from 'react';
import {
    DesktopOutlined,
    SettingOutlined,
    PieChartOutlined,
    BranchesOutlined,
    ProductOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem('Dashboard',        '/',         <PieChartOutlined />),
    getItem('Home',             '/home',     <DesktopOutlined />),
    getItem('Product',          '/product',  <ProductOutlined />, [
        getItem('Coca Cola',  '/cocacola'),  // ✅ real labels
        getItem('Champagne',  '/champain'),
        getItem('Sting',      '/sting'),
    ]),
    getItem('Brand',            '/brand',    <BranchesOutlined />, [
        getItem('Brand A',    '/brand/a'),   // ✅ proper route paths
        getItem('Brand B',    '/brand/b'),
    ]),
    getItem('Setting',          '/setting',  <SettingOutlined />),
    getItem('Role Management',  '/role',     <SettingOutlined />), // ✅ clean label
];

const MainLayout = () => {
    const navigate = useNavigate(); // ✅ fixed variable name
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    function handleMenu(event) {   // ✅ fixed typo
        navigate(event.key);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['/']}  // ✅ matches Dashboard key
                    mode="inline"
                    items={items}
                    onClick={handleMenu}          // ✅ fixed typo
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb
                        style={{ margin: '16px 0' }}
                        items={[{ title: 'User' }, { title: 'HUN SOKHENG' }]}
                    />
                    <div style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;