import { Button, Layout } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileAPI } from "../../api";
import { AdminDataTable } from "../../components/Common/AdminDataTable";
import { AppLoader } from "../../components/Common/AppLoader";
import { ProfileListBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const ProfilesList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const columns: ColumnsType<Profile> = [
    {
      title: "Partida ID",
      dataIndex: "partidaId",
      key: "partidaId",
      width: 150,
    },
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
  ];

  const fetchData = (params: object) => ProfileAPI.getProfiles(params);

  const doDelete = async (id: string | number) => {
    return ProfileAPI.deleteProfile(id as string);
  };

  const doEdit = async (id: string | number) => {
    navigate(`/admin/profiles/manage/${id}`);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div className="flex justify-between items-center">
          <ProfileListBreadcrumb />

          <Button
            onClick={() => navigate("/admin/profiles/manage")}
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
            background: "#fff",
          }}>
          <section className="mx-auto">
            <AdminDataTable
              queryKey="profiles"
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
