import { Breadcrumb, Layout, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLoader } from "../../components/Common/AppLoader";
import ProfilesForm, {
  ProfilesFormHandle,
} from "../../components/Forms/Profiles/ProfilesForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";

const { Content } = Layout;

export const ProfilesManage: React.FC = () => {
  const profileFormRef = useRef<ProfilesFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createProfile");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Perfiles",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/profiles");
      },
      href: "/admin/profiles",
    },
    {
      title: "Crear - Editar perfil",
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}>
          <section className="max-w-[1500px]">
            <ProfilesForm ref={profileFormRef} />

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
