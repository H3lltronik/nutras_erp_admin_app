import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import logo from './assets/nutras-logo.png';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Produccion', '1', <PieChartOutlined />, [
    getItem('OT', '100'),
    getItem('Explosión de insumos', '2'),
    getItem('Requisiciones', '3'),
    getItem('Inventario', '4'),
  ]),
  getItem('Almacen', '20', <DesktopOutlined />, [
    getItem('Inventario', '5'),
    getItem('Movimientos', '6'),
  ]),
  getItem('Direccion', 'sub1', <UserOutlined />, [
    getItem('Solicitud trabajo', '7'),
    getItem('Orden de trabajo', '8'),
    getItem('Requisiciones', '9'),
  ]),
  getItem('Calidad', 'sub3', <UserOutlined />, [
    getItem('Revisiones de movimientos', '10'),
    getItem('Revisiones de productos', '11'),
    getItem('Inspecciones de área', '12'),
  ]),
  getItem('Compras', 'sub2', <TeamOutlined />, [
    getItem('Ordenes compra', '13'), 
  ]),
  getItem('Transporte', '14', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{backgroundImage: `url(${logo})`}} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Orden de trabajo</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Orden de trabajo
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;