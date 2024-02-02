import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { UsersListBreadcrumb } from "../Common/Breadcrums";
import UsersFilters from "./UsersFilters";
import { usersListColumns } from "./usersTableColumns";
import { useUsersListPageStore } from "./users_list_page.store";

const { Content } = Layout;

export const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const {
    nameSearch,
    usernameSearch,
    profileSearch,
    departmentSearch,
    getDraftMode,
    getPublished,
  } = useUsersListPageStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

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
        <div className="bg-white p-[24px]">
          <UsersFilters />
          profile {profileSearch}
          <section className="mx-auto">
            <AdminDataTable
              queryKey="users"
              fetchData={fetchData}
              columns={usersListColumns}
              deleteAction={doDelete}
              editAction={doEdit}
              perPage={20}
              rowClassName={(_record) => {
                const record = _record as Product;
                if (record.deletedAt) return "cancelled-row";
                if (record.isDraft) return "draft-row";

                return "";
              }}
              queryParameters={{
                nameSearch,
                usernameSearch,
                profileId: profileSearch,
                departmentId: departmentSearch,
                draftMode: getDraftMode(),
                published: getPublished(),
              }}
            />
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
