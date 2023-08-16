import { Breadcrumb, Layout, Typography, theme } from "antd";
import React, { useEffect } from "react";
import { UserAPI } from "../../api";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const Users: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      const res = await UserAPI.getUsers();
      console.log(res);
    })();
  }, []);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Seguridad</Breadcrumb.Item>
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}>
          <h1>xd</h1>
        </div>
      </Content>
    </>
  );
};
