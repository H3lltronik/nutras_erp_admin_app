import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Layout, Space, Table, TablePaginationConfig } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import { useLocationQuery } from "../../hooks/useLocationQuery";
import { showToast } from "../../lib/notify";
import { ProfileListBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const ProfilesList: React.FC = () => {
  const navigate = useNavigate();
  const locationQuery = useLocationQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const _page = locationQuery.get("page");
    const page = _page ? parseInt(_page, 10) : 1;
    setCurrentPage(page);
  }, [locationQuery]);

  const {
    data: profilesData,
    isLoading: profilesLoading,
    refetch: refetchProfiles,
  } = useQuery<GetProfilesResponse | APIError>(
    ["profiles", currentPage],
    () => ProfileAPI.getProfiles({ offset: (currentPage - 1) * 5, limit: 5 }) // Adjusted offset calculation
  );
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const totalItems = useMemo(() => {
    if (profilesLoading || !profilesData) return 0;
    if (!("pagination" in profilesData)) return 0;

    return profilesData.pagination.totalItems;
  }, [profilesData, profilesLoading]);

  const { mutateAsync: deleteUser } = useMutation(
    (id: string) => ProfileAPI.deleteProfile(id),
    {
      onSuccess: () => {
        showToast("Usuario eliminado correctamente", "success");
      },
      onError: (error: APIError) => {
        showToast(error?.messages[0], "error");
      },
      onSettled: () => {
        refetchProfiles();
        setPageLoading(false);
      },
    }
  );

  const doDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este perfil?");
    if (!confirm) return;

    setPageLoading(true);
    await deleteUser(id);
  };

  const dataSource = useMemo(() => {
    if (profilesLoading || !profilesData) return [];
    if ("data" in profilesData) return profilesData.data;

    return [];
  }, [profilesData, profilesLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    navigate(`/admin/profiles?page=${pagination.current}`);
    setCurrentPage(pagination.current as number);
  };

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
      render: (_: unknown, _record: Profile) => (
        <Space size="middle">
          <a onClick={() => navigate(`/admin/profiles/manage/${_record.id}`)}>
            <span>Edit</span>
          </a>
          <a onClick={() => doDelete(_record.id)}>
            <span>Delete</span>
          </a>
        </Space>
      ),
    },
  ];

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
            <Table
              dataSource={dataSource}
              columns={columns}
              onChange={handleTableChange}
              pagination={{
                current: currentPage,
                total: totalItems as number, // Total number of items
                pageSize: 5, // Items per page
              }}
            />
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
