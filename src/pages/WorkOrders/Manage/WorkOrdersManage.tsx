import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkOrderAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import WorkOrderForm, {
  WorkOrderFormHandle,
} from "../../../components/Forms/WorkOrder/WorkOrderForm";
import useAuth from "../../../hooks/useAuth";
import { cancelModal, showToast } from "../../../lib/notify";
import { WorkOrdersManageBreadcrumb } from "../Common/Breadcrums";
import { WorkOrder, GetWorkOrderResponse, CreateWorkOrderRequest } from "../../../api/workOrder/types";

const { confirm } = Modal;
const { Content } = Layout;

export const WorkOrdersManage: React.FC = () => {
  const user = useAuth().user;
  const workOrderFormRef = useRef<WorkOrderFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation<
    unknown,
    unknown,
    { id: string; data: WorkOrder }
  >(["updateWorkOrder"], (variables) =>
    WorkOrderAPI.updateWorkOrder(variables.id, variables.data)
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetWorkOrderResponse | APIError>(
    ["workOrder", { id }],
    () => WorkOrderAPI.getWorkOrder(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const workOrderFormData = (await workOrderFormRef.current?.getFormData({
      draftMode: isDraft,
      user,
    })) as CreateWorkOrderRequest;
    console.log("workOrderFormData", workOrderFormData);

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await WorkOrderAPI.updateWorkOrder(
            entity.id,
            workOrderFormData
          );
          message = "workOrdero actualizado correctamente";
        } else {
          alert("No se puede actualizar el WorkOrdero");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await WorkOrderAPI.createWorkOrder(workOrderFormData);
        message = "Orden de trabajo creada correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/work-orders");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/work-orders"),
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
        <WorkOrdersManageBreadcrumb />

        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <WorkOrderForm ref={workOrderFormRef} entity={entityData} />

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
