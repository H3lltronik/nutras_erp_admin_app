import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLoader } from "../../components/Common/AppLoader";
import ProfilesForm, {
  ProfilesFormHandle,
} from "../../components/Forms/Profiles/ProfilesForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";
import { ProfileManageBreadcrumb } from "./Breadcrums";
import { useQuery } from "@tanstack/react-query";
import { ProfileAPI } from "../../api";

const { Content } = Layout;

export const ProfilesManage: React.FC = () => {
  const profileFormRef = useRef<ProfilesFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createProfile");
  const navigate = useNavigate();
  const { id } = useParams();

  const entity = useQuery<GetProfileResponse | APIError>(
    ["profiles", { id }],
    () => ProfileAPI.getProfile(id as string),
    { enabled: !!id }
  );

  const submitForm = async () => {
    const profileFormData =
      (await profileFormRef.current?.getFormData()) as CreateProfileRequest;

    setPageLoading(true);
    const result = await mutateAsync(profileFormData);

    if (result.id) {
      showToast("Perfil creado correctamente", "success");
      navigate("/admin/profiles");
    }

    setPageLoading(false);
  };

  const entityData = useMemo(() => {
    if (entity.isLoading || !entity.data) return null;
    if ("id" in entity.data) return entity.data;

    return null;
  }, [entity]);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <ProfileManageBreadcrumb />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <section className="max-w-[1500px]">
            <ProfilesForm ref={profileFormRef} entity={entityData} />

            <button
              className="bg-gray-500 py-1 px-2 rounded-lg text-white"
              onClick={submitForm}>
              Submit form
            </button>
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
