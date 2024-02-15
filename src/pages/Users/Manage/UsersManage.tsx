import { useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import UserForm, {
  UserFormHandle,
} from "../../../components/Forms/User/UserForm";
import useAdminMutation from "../../../hooks/useAdminAPI/useAdminMutation";
import { cancelModal, showToast } from "../../../lib/notify";
import { UsersManageBreadcrumb } from "../Common/Breadcrums";

const { confirm } = Modal;
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
  } = useQuery<GetUserResponse | APIError>({
    queryKey: ["users", { id }],
    queryFn: () => UserAPI.getUser(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const userFormData = (await userFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as CreateUserRequest;

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

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/users"),
    });
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
              type="button"
              onClick={() => submitForm(false)}
              className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
              Procesar
            </button>
            {!entityData?.isPublished && (
              <button
                type="button"
                onClick={() => submitForm(true)}
                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                Borrador
              </button>
            )}
            <button
              type="button"
              onClick={doCancel}
              className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </section>
        </div>

        <AppLoader isLoading={loading} />
      </Content>
    </>
  );
};
