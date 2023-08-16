import { Breadcrumb, Layout, Typography, theme } from "antd";
import React from "react";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const Test: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Seguridad</Breadcrumb.Item>
          <Breadcrumb.Item>Perfiles</Breadcrumb.Item>
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
    </>
  );
};
