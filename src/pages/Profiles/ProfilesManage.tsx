import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import ProfilesForm, {
  ProfilesFormHandle,
} from "../../components/Forms/Profiles/ProfilesForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";
import { ProfileManageBreadcrumb } from "./Breadcrums";

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
    try {
      let result = null;
      let message = "";

      if (entity?.data) {
        if ("id" in entity.data) {
          result = await ProfileAPI.updateProfile(
            entity.data.id,
            profileFormData
          );
          message = "Perfil actualizado correctamente";
        } else {
          alert("No se puede actualizar el perfil");
          console.error("Not valid entity", entity.data);
        }
      } else {
        result = await mutateAsync(profileFormData);
        message = "Perfil creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/profiles");
        }
      }
    } catch (error) {
      console.log("error", error);
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
