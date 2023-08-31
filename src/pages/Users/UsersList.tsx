import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api";
import { AdminDataTable } from "../../components/Common/AdminDataTable";
import { AppLoader } from "../../components/Common/AppLoader";
import { UsersListBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const UsersList: React.FC = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const columns = [
    {
      title: "Partida ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profileName",
      render: (profile: Profile) => profile && profile.name,
    },
  ];

  const fetchData = (params: object) => UserAPI.getUsers(params);

  const doDelete = async (id: string | number) => {
    return UserAPI.deleteUser(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`/admin/users/manage/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <UsersListBreadcrumb />

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
            background: "#fff",
          }}>
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={columns}
              deleteAction={doDelete}
              editAction={doEdit}
            />
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
