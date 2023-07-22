import logo from "@/assets/nutras-logo.png";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Popover,
  Typography,
  theme,
} from "antd";
import React, { useState } from "react";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Produccion", "1", <PieChartOutlined />, [
    getItem("OT", "100"),
    getItem("Explosión de insumos", "2"),
    getItem("Requisiciones", "3"),
    getItem("Inventario", "4"),
  ]),
  getItem("Almacen", "20", <DesktopOutlined />, [
    getItem("Inventario", "5"),
    getItem("Movimientos", "6"),
  ]),
  getItem("Direccion", "sub1", <UserOutlined />, [
    getItem("Solicitud trabajo", "7"),
    getItem("Orden de trabajo", "8"),
    getItem("Requisiciones", "9"),
  ]),
  getItem("Calidad", "sub3", <UserOutlined />, [
    getItem("Revisiones de movimientos", "10"),
    getItem("Revisiones de productos", "11"),
    getItem("Inspecciones de área", "12"),
  ]),
  getItem("Compras", "sub2", <TeamOutlined />, [
    getItem("Ordenes compra", "13"),
  ]),
  getItem("Transporte", "14", <FileOutlined />),
];

const popupContent = () => (
  <>
    <div className="w-min-[350px] bg-blue-200 p-5 flex gap-4">
      <Avatar
        className="bg-green-300 outline outline-green-900"
        shape="square"
        size={50}>
        <strong className="text-green-900">AV</strong>
      </Avatar>
      <div className="my-auto max-w-[200px]">
        <Text strong className="text-lg" ellipsis={true}>
          Andrea Valenzuela
        </Text>
      </div>
    </div>
    <div className="flex px-3 py-2 gap-2">
      <Button block>
        <UserOutlined />
        Mi perfil
      </Button>
      <Button block>
        <PoweroffOutlined />
        Cerrar sesión
      </Button>
    </div>
  </>
);

export const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div
          className="demo-logo-vertical"
          style={{ backgroundImage: `url(${logo})` }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="w-full flex flex-row">
            <nav className="flex-1">
              <ul>
                <li>Home</li>
              </ul>
            </nav>
            <section className="flex items-center gap-3 flex-nowrap">
              <Text>
                Hola, <strong>Andrea</strong>
              </Text>
              <Popover
                trigger={"click"}
                content={popupContent()}
                className="cursor-pointer">
                <Avatar className="bg-green-300" shape="square" size={35}>
                  <strong className="text-green-900">AV</strong>
                </Avatar>
              </Popover>
            </section>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Orden de trabajoa</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className=""
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}>
            Orden de trabajo
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
