import { Breadcrumb, Button, Layout, Space, Table, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAPI } from "../../hooks";

const { Content } = Layout;

export const UsersList: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { data: usersData, isLoading: usersLoading } = useAdminAPI("users");

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
    },
  ];

  const dataSource = useMemo(() => {
    if (usersLoading) return [];

    return usersData;
  }, [usersData, usersLoading]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: unknown, record: unknown) => (
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
            Nuevo usuario
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
