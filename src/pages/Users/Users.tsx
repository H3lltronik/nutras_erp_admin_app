import { Breadcrumb, Layout, Typography, theme } from "antd";
import React, { useEffect, useRef } from "react";
import { UserAPI } from "../../api";
import UserForm, { UserFormHandle } from "../../components/Forms/User/UserForm";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const Users: React.FC = () => {
  const userFormRef = useRef<UserFormHandle | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      const res = await UserAPI.getUsers();
      console.log(res);
    })();
  }, []);

  const submitForm = async () => {
    const userFormData = await userFormRef.current?.getFormData();
    console.log("userFormData", userFormData);
  };

  const breadcrumb: ItemType[] = [
    {
      title: "Seguridad",
    },
    {
      title: "Usuarios",
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
