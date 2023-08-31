import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import UserForm, { UserFormHandle } from "../../components/Forms/User/UserForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";
import { UsersManageBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const UsersManage: React.FC = () => {
  const userFormRef = useRef<UserFormHandle | null>(null);
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createUser");
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetUserResponse | APIError>(
    ["users", { id }],
    () => UserAPI.getUser(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async () => {
    const userFormData =
      (await userFormRef.current?.getFormData()) as CreateUserRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await UserAPI.updateUser(entity.id, userFormData);
          message = "Usuario actualizado correctamente";
        } else {
          alert("No se puede actualizar el usuario");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await mutateAsync(userFormData);
        message = "Usuario creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/users");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const entityData = useMemo(() => {
    if (!entity) return null;
    if ("id" in entity) return entity;

    return null;
  }, [entity]);

  return (
    <>
      <Content className="relative mx-4">
        <UsersManageBreadcrumb />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <section className="max-w-[1500px]">
            <UserForm ref={userFormRef} entity={entityData} />
            <button
              className="bg-gray-500 py-1 px-2 rounded-lg text-white"
              onClick={submitForm}>
              Submit form
            </button>
          </section>
        </div>

        <AppLoader isLoading={loading} />
      </Content>
    </>
  );
};
