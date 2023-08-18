import { Breadcrumb, Layout, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";

const { Content } = Layout;

export const Home: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumb: ItemType[] = [
    {
      title: "Dashboard",
    },
    {
      title: "Home",
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />
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
