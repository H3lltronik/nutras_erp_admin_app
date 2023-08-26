import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Layout, Space, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import { useLocationQuery } from "../../hooks/useLocationQuery";
import { showToast } from "../../lib/notify";
import { UsersListBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const locationQuery = useLocationQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const _page = locationQuery.get("page");
    const page = _page ? parseInt(_page, 10) : 1;
    setCurrentPage(page);
  }, [locationQuery]);

  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery<GetUsersResponse | APIError>(["users", currentPage], () =>
    UserAPI.getUsers({ page: currentPage })
  );
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const { mutateAsync: deleteUser } = useMutation(
    (id: string) => UserAPI.deleteUser(id),
    {
      onSuccess: () => {
        showToast("Usuario eliminado correctamente", "success");
      },
      onError: (error: APIError) => {
        showToast(error?.messages[0], "error");
      },
      onSettled: () => {
        refetchUsers();
        setPageLoading(false);
      },
    }
  );

  const doDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirm) return;

    setPageLoading(true);
    await deleteUser(id);
  };

  const dataSource = useMemo(() => {
    if (usersLoading || !usersData) return [];
    if (Array.isArray(usersData)) return usersData;

    return [];
  }, [usersData, usersLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    navigate(`/admin/profiles?page=${pagination.current}`);
    setCurrentPage(pagination.current as number);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, _record: User) => (
        <Space size="middle">
          <a onClick={() => navigate(`/admin/users/manage/${_record.id}`)}>
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
            <Table
              dataSource={dataSource}
              columns={columns}
              onChange={handleTableChange}
              pagination={{ current: currentPage }}
            />
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
