import { Breadcrumb, Image, Layout, Typography } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";
import nutrasLogo from "../../assets/dashboard.svg";

const { Content } = Layout;

export const Home: React.FC = () => {
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
            background: "#fff",
          }}>
          <div className="mx-auto text-center">
            <Typography.Title level={1}>Bienvenido al sistema</Typography.Title>
            <Image
              preview={false}
              src={nutrasLogo}
              className="-mt-10"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      </Content>
    </>
  );
};
