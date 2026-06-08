import { useState } from 'react';
import {
    SettingOutlined, PieChartOutlined,
    BranchesOutlined, ProductOutlined,
    ShopOutlined, AppstoreAddOutlined,
       } from '@ant-design/icons';

import {Breadcrumb, Layout, Menu, Space, Tag, theme} from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import appLogo from '../../assets/logo.jpg';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem('Dashboard',       '/',         <PieChartOutlined />),
    getItem('Product',         '/product',  <ProductOutlined />),
    getItem('Category',        '/category', <ShopOutlined />),
    getItem('Brand',           '/brand',    <BranchesOutlined />),
    getItem('Role Management', '/role',     <AppstoreAddOutlined />),
    getItem('Setting',         '/setting',  <SettingOutlined />),
];

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const breadcrumbItems = [
        { title: 'Dashboard' },
        ...location.pathname
            .split('/')
            .filter(Boolean)
            .map(seg => ({ title: seg.charAt(0).toUpperCase() + seg.slice(1) })),
    ];

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>

                {/* Logo area */}
                <div style={{
                    display: 'flex',
                    flexDirection: collapsed ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '20px 12px 16px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: 8,
                }}>
                    <img
                        src={appLogo}
                        alt="logo"
                        style={{
                            width: collapsed ? 40 : 50,
                            height: collapsed ? 40 : 50,
                            borderRadius: 12,
                            objectFit: 'cover',
                            flexShrink: 0,
                            border: '2px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                            transition: 'all 0.3s',
                        }}
                    />
                    {!collapsed && (
                        <span style={{
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: 15,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                            lineHeight: 1.2,
                        }}>
                            Heng-Azy
                        </span>
                    )}
                </div>

                <Menu
                    theme="dark"
                    selectedKeys={[location.pathname]}
                    mode="inline"
                    items={items}
                    onClick={({key}) => navigate(key)}
                />
            </Sider>

            <Layout>
                {/* Header */}
                <Header style={{
                    padding: '0 24px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                    <Space style={{
                        fontWeight: 800,
                        fontSize: 15,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                        whiteSpace: 'nowrap',
                    }}>
                        System Sale Computer
                    </Space>
                </Header>

                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}} items={breadcrumbItems}/>
                    <div style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;