import { Breadcrumb, Layout, Typography, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useRef } from "react";
import UserForm, { UserFormHandle } from "../../components/Forms/User/UserForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const UsersManage: React.FC = () => {
  const userFormRef = useRef<UserFormHandle | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { mutateAsync } = useAdminMutation("createUser");

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
    },
  ];

  const submitForm = async () => {
    const userFormData =
      (await userFormRef.current?.getFormData()) as CreateUserRequest;
    console.log("userFormData", userFormData);

    await mutateAsync(userFormData);
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
      </Content>
    </>
  );
};
