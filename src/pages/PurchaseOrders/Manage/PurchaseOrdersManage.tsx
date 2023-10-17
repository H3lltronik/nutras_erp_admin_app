import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, Modal } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PurchaseOrderAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import PurchaseOrderForm, {
  PurchaseOrderFormHandle,
} from "../../../components/Forms/PurchaseOrder/PurchaseOrderForm";
import useAdminMutation from "../../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../../lib/notify";
import { PurchaseOrdersManageBreadcrumb } from "../Common/Breadcrums";

const { confirm } = Modal;
const { Content } = Layout;

export const PurchaseOrdersManage: React.FC = () => {
  const purchaseOrderFormRef = useRef<PurchaseOrderFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation<unknown>((id: string, data: PurchaseOrder) => PurchaseOrderAPI.updatePurchaseOrder(id, data));
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetPurchaseOrderResponse | APIError>(
    ["purchaseOrder", { id }],
    () => PurchaseOrderAPI.getPurchaseOrder(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const purchaseOrderFormData = (await purchaseOrderFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as CreatePurchaseOrderRequest;
    console.log("purchaseOrderFormData", purchaseOrderFormData);

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await PurchaseOrderAPI.updatePurchaseOrder(entity.id, purchaseOrderFormData);
          message = "PurchaseOrdero actualizado correctamente";
        } else {
          alert("No se puede actualizar el purchaseOrdero");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await mutateAsync(purchaseOrderFormData);
        message = "PurchaseOrdero creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/purchaseOrders");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <p className="mt-5">
          ¿Desea salir? Si tiene algun cambio sin guardar, no se podra
          recuperar.
        </p>
      ),
      onOk: () => navigate("/admin/purchaseOrders"),
      okButtonProps: {
        className: "bg-red-500 border-none hover:bg-red-600",
      },
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
        <PurchaseOrdersManageBreadcrumb />

        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <PurchaseOrderForm ref={purchaseOrderFormRef} entity={entityData} />

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