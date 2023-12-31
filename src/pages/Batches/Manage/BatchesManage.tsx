import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BatchAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import BatchForm, {
  BatchFormHandle,
} from "../../../components/Forms/Batch/BatchForm";
import { cancelModal, showToast } from "../../../lib/notify";
import { BatchesManageBreadcrumb } from "../Common/Breadcrums";
import useAuth from "../../../hooks/useAuth";

const { confirm } = Modal;
const { Content } = Layout;

export const BatchesManage: React.FC = () => {
  const user = useAuth().user;
  const batchFormRef = useRef<BatchFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation<unknown>(
    (id: string, data: Batch) =>
      BatchAPI.updateBatch(id, data)
  );
  const navigate = useNavigate();
  const { id } = useParams();

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
      user
    })) as CreateBatchRequest;
    console.log("batchFormData", batchFormData);

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await BatchAPI.updateBatch(
            entity.id,
            batchFormData
          );
          message = "Batch updated successfully";
        } else {
          alert("Cannot update the Batch");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await mutateAsync(batchFormData);
        message = "Batch created successfully";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/Batches");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/Batches"),
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
            <BatchForm ref={batchFormRef} entity={entityData} />

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
