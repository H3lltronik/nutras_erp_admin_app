import { Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileAPI } from "../../../api";
import { AdminDataTable } from "../../../components/Common/AdminDataTable";
import { AppLoader } from "../../../components/Common/AppLoader";
import { useAbilities } from "../../../hooks/roles/useAbilities";
import useAuth from "../../../hooks/useAuth";
import { ProfileListBreadcrumb } from "../Common/Breadcrums";
import ProfilesFilters from "./ProfilesFilters";
import { profileListColumns } from "./profilesTableColumn";

const { Content } = Layout;

export const ProfilesList: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { user } = useAuth();
  const ability = useAbilities(user?.profile.roles || []);

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
        <div className="p-[24px] bg-white">
          <ProfilesFilters />

          <section className="mx-auto">
            <AdminDataTable
              queryKey="profiles"
              fetchData={fetchData}
              columns={profileListColumns}
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
