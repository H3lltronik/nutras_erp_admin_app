import {
  Breadcrumb,
  Button,
  Layout,
  Space,
  Table,
  Typography,
  theme,
} from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAPI } from "../../hooks";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const ProfilesList: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { data: profilesData, isLoading: profilesLoading } =
    useAdminAPI("profiles");

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Perfiles",
    },
  ];

  const dataSource = useMemo(() => {
    if (profilesLoading) return [];

    return profilesData;
  }, [profilesData, profilesLoading]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />

          <Button
            onClick={() => navigate("/admin/users/manage")}
            className="bg-green-600 text-white hover:bg-green-50"
            type="default">
            Nuevo perfil
          </Button>
        </div>
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}>
          <section className="mx-auto">
            <Table dataSource={dataSource} columns={columns} />
          </section>
        </div>
      </Content>
    </>
  );
};
