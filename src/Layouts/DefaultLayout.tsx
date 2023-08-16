import { Layout, Typography } from "antd";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/nutras-logo.png";
import useAuth from "../hooks/useAuth";
import { DefaultHeader } from "./DefaultHeader";
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
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        {props.children}
        <Footer style={{ textAlign: "center" }} />
      </Layout>
    </Layout>
  );
};
