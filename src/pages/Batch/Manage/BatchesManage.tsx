import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BatchAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import BatchForm from "../../../components/Forms/Batch/BatchForm";
import { BatchFormHandle } from "../../../components/Forms/Batch/BatchFormCompras";
import { useAbilities } from "../../../hooks/roles/useAbilities";
import useAuth from "../../../hooks/useAuth";
import { cancelModal } from "../../../lib/notify";
import { BatchesManageBreadcrumb } from "../Common/Breadcrums";

const { Content } = Layout;

type BatchesManageProps = {
  formMode?: FormMode;
};

export const BatchesManage: React.FC<BatchesManageProps> = (props) => {
  const batchFormRef = useRef<BatchFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation((data: unknown) =>
    BatchAPI.createBatch<unknown>(data)
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const ability = useAbilities(user?.profile.roles || []);

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetBatchResponse | APIError>(
    ["batch", { id }],
    () => BatchAPI.getBatch(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const batchFormData = (await batchFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as unknown;
  };

  const doCancel = async () => {
    cancelModal({
      onOk: () => navigate("/admin/inventory"),
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
        <BatchesManageBreadcrumb />
        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <>
              <h2 className="text-2xl">Formulario de Lotes</h2>
              <hr className="mt-2 mb-5" />
              <BatchForm ref={batchFormRef} entity={entityData} />
            </>

            {props.formMode === "view" ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                  Regresar
                </button>
              </>
            ) : (
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
          </section>
        </div>
        <AppLoader isLoading={loading} />
      </Content>
    </>
  );
};
