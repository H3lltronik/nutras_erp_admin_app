import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PurchaseRequisitionAPI } from "../../../api";
import {
  CreatePurchaseRequisitionRequest,
  GetPurchaseRequisitionResponse,
} from "../../../api/purchaseRequisition/types";
import { AppLoader } from "../../../components/Common/AppLoader";
import PurchaseRequisitionForm, {
  PurchaseRequisitionFormHandle,
} from "../../../components/Forms/PurchaseRequisition/PurchaseRequisitionForm";
import { cancelModal, showToast } from "../../../lib/notify";
import { PurchaseRequisitionManageBreadcrumb } from "../Common/Breadcrums";

const { Content } = Layout;

export const PurchaseRequisitionManage: React.FC = () => {
  const purchaseRequisitionFormRef =
    useRef<PurchaseRequisitionFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetPurchaseRequisitionResponse | APIError>(
    ["purchaseRequisition", { id }],
    () => PurchaseRequisitionAPI.getPurchaseRequisition(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const purchaseRequisitionFormData =
      (await purchaseRequisitionFormRef.current?.getFormData({
        draftMode: isDraft,
      })) as CreatePurchaseRequisitionRequest;
    console.log("purchaseRequisitionFormData", purchaseRequisitionFormData);

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await PurchaseRequisitionAPI.updatePurchaseRequisition(
            entity.id,
            purchaseRequisitionFormData
          );
          message = "purchaseRequisitiono actualizado correctamente";
        } else {
          alert("No se puede actualizar el PurchaseRequisitiono");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await PurchaseRequisitionAPI.createPurchaseRequisition(
          purchaseRequisitionFormData
        );
        message = "Orden de trabajo creada correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/purchase-requisition/");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/purchase-requisition/"),
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
        <PurchaseRequisitionManageBreadcrumb />

        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <PurchaseRequisitionForm
              ref={purchaseRequisitionFormRef}
              entity={entityData}
            />

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
