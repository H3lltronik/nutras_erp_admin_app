import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProvidersAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import ProviderForm, {
  ProviderFormHandle,
} from "../../../components/Forms/Provider/ProviderForm";
import { useAbilities } from "../../../hooks/roles/useAbilities";
import useAuth from "../../../hooks/useAuth";
import { useFormModeChecker } from "../../../lib/form/disabledChecked";
import { cancelModal, showToast } from "../../../lib/notify";
import { ProvidersManageBreadcrumb } from "../Common/Breadcrums";

const { confirm } = Modal;
const { Content } = Layout;

type ProvidersManageProps = {
  onSuccess?: (data?: Provider) => void;
  enableRedirect?: boolean;
  inModal?: boolean;
  formMode?: FormMode;
  hiddenFields?: {
    [K in keyof Provider]?: boolean;
  };
  requiredFields?: {
    [K in keyof Provider]?: boolean;
  };
};

export const ProvidersManage: React.FC<ProvidersManageProps> = (props) => {
  const providerFormRef = useRef<ProviderFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateProviderRequest) =>
      ProvidersAPI.createProvider<CreateProviderRequest>(data),
    onSuccess: () => {
      showToast("Proveedorador creado correctamente", "success");
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const ability = useAbilities(user?.profile.roles || []);
  const { disabled } = useFormModeChecker({ formMode: props.formMode });

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetProviderResponse | APIError>({
    queryKey: ["provider", { id }],
    queryFn: () => ProvidersAPI.getProvider(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const providerFormData = (await providerFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as CreateProviderRequest;
    if (disabled) {
      console.log("The form is disabled");
      return;
    }

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await ProvidersAPI.updateProvider(
            entity.id,
            providerFormData
          );
          message = "Proveedor actualizado correctamente";
        } else {
          alert("No se puede actualizar el proveedor");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await mutateAsync(providerFormData);
        message = "Proveedor creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          if (props.enableRedirect ?? false) navigate("/admin/providers");
          if (props.onSuccess) props.onSuccess(result);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/providers"),
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
        <ProvidersManageBreadcrumb />

        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <ProviderForm
              formMode={props.formMode}
              inModal={props.inModal ?? false}
              hiddenFields={props.hiddenFields}
              requiredFields={props.requiredFields}
              ref={providerFormRef}
              entity={entityData}
            />

            {!disabled && (
              <>
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
              </>
            )}

            {disabled && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                Regresar
              </button>
            )}
          </section>
        </div>
        <AppLoader isLoading={loading} />
      </Content>
    </>
  );
};
