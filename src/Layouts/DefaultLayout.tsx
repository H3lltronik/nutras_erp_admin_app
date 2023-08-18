import { Layout, Typography } from "antd";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/nutras-logo.png";
import { DefaultHeader } from "./DefaultHeader";
import { DefaultLayoutContent } from "./DefaultLayoutContent";
import { AdminMenu } from "./Menu";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

interface HeaderProps {
  navContent?: React.ReactNode;
  children?: React.ReactNode;
  headerTitle?: string;
}

export const DefaultLayout: React.FC<HeaderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { navContent, headerTitle } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        className="shadow-lg"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div
          className="demo-logo-vertical"
          style={{ backgroundImage: `url(${logo})` }}
        />
        <AdminMenu />
      </Sider>
      <Layout>
        <DefaultHeader
          navContent={navContent}
          title={headerTitle ?? "NUTRAS"}
        />
        {/* <Outlet /> */}
        <ToastContainer />

        <DefaultLayoutContent children={props.children} />

        <Footer style={{ textAlign: "center" }} />
      </Layout>
    </Layout>
  );
};
