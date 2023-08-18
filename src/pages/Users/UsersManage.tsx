import { Breadcrumb, Layout, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppLoader } from "../../components/Common/AppLoader";
import UserForm, { UserFormHandle } from "../../components/Forms/User/UserForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";

const { Content } = Layout;

export const UsersManage: React.FC = () => {
  const userFormRef = useRef<UserFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createUser");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
      className:
        "cursor-pointer hover:text-blue-500 transition-all duration-300",
      onClick: () => {
        navigate("/admin/users");
      },
      href: "/admin/users",
    },
    {
      title: "Crear - Editar usuario",
    },
  ];

  const submitForm = async () => {
    const userFormData =
      (await userFormRef.current?.getFormData()) as CreateUserRequest;
    console.log("userFormData", userFormData);

    setPageLoading(true);
    const result = await mutateAsync(userFormData);

    if (result.id) {
      showToast("Usuario creado correctamente", "success");
      navigate("/admin/users");
    }

    setPageLoading(false);
  };

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
            <UserForm ref={userFormRef} />

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
