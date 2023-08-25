import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Layout } from "antd";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import UserForm, { UserFormHandle } from "../../components/Forms/User/UserForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";
import { usersBreadcrumb } from "./usersBreadcrums";

const { Content } = Layout;

export const UsersManage: React.FC = () => {
  const userFormRef = useRef<UserFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createUser");
  const navigate = useNavigate();
  let { id } = useParams();

  const entity = useQuery<GetUserResponse | null>(
    ["users", { id }],
    () => UserAPI.getUser(id as string),
    {
      enabled: !!id,
    }
  );

  const submitForm = async () => {
    const userFormData =
      (await userFormRef.current?.getFormData()) as CreateUserRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";
      console.log("entity", entity);
      if (entity.data?.id) {
        result = await UserAPI.updateUser(entity.data.id, userFormData);
        message = "Usuario actualizado correctamente";
      } else {
        result = await mutateAsync(userFormData);
        message = "Usuario creado correctamente";
      }

      if (result?.id) {
        showToast(message, "success");
        navigate("/admin/users");
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={usersBreadcrumb} />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <section className="max-w-[1500px]">
            <UserForm ref={userFormRef} entity={entity.data} />
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
