import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { MutableRefObject, createRef, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovementAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import MovementForm, {
  MovementFormHandle,
} from "../../../components/Forms/Movement/MovementForm";
import { cancelModal, showToast } from "../../../lib/notify";
import { MovementsManageBreadcrumb } from "../Common/Breadcrums";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../Products";
import ProductBatchForm from "../Common/ProductBatchForm";
import { WorkOrder } from "../../../api/workOrder/types";
import { PurchaseRequisition } from "../../../api/purchaseRequisition/types";

const { Content } = Layout;

export const MovementsManage: React.FC = () => {
  const user = useAuth().user;
  const MovementFormRef = useRef<MovementFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);
  const [selectingProducts, setSelectingProducts] = React.useState<boolean>(true);
  const [movementConcept, setMovementConcept] = React.useState<MovementConcept | null>(null);
  const [formRefs, setFormRefs] = React.useState<MutableRefObject<any>[]>([]);

  const { mutateAsync } = useMutation<unknown>(
    (id: string, data: Movement) =>
      MovementAPI.updateMovement(id, data)
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetMovementResponse | APIError>(
    ["Movement", { id }],
    () => MovementAPI.getMovement(id as string),
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const resetFormVariables = () => {
    MovementFormRef.current?.resetField('requisitionId');
    setMovementConcept(movementConcept);
    setSelectedProducts([]);
    setSelectingProducts(false);
    setFormRefs([]);
  }

  const onMovementConceptSelected = (movementConcept: MovementConcept) => {
    resetFormVariables();
    if(movementConcept.name == 'Recepción de producción') {
      setSelectingProducts(false);
    } else {
      setSelectedProducts([]);
      setSelectingProducts(true);
    }
  }

  const onWorkOrderChange = (workOrder: WorkOrder) => {
  }

  const onPurchaseRequisitionChange = (purchaseRequisition: PurchaseRequisition) => {
    if(purchaseRequisition) {
      const productsList = purchaseRequisition.purchase_requisition_products;
      setFormRefs(productsList.map(() => createRef<any>()));
      setSelectedProducts(productsList.map((product) => {
        product.product.quantity = product.quantity;
        return product.product;
      }));
    }
  }

  const onProductSelectionDone = () => {
    setFormRefs(selectedProducts.map(() => createRef<any>()));
    setSelectingProducts(false);
  }

  const submitForm = async (isDraft = false) => {
    const MovementFormData = (await MovementFormRef.current?.getFormData({
      draftMode: isDraft,
      user
    })) as CreateMovementRequest;
    let movement: any = {...MovementFormData};
    movement.batches = formRefs.map((formRef, index) => {
      let batch = formRef.current?.getFieldsValue();
      batch.product = selectedProducts[index];
      batch.productId = batch.product.id;
      return batch;
    });
    movement.fromId = movement.originWarehouseId;
    movement.toId = movement.destinyWarehouseId;
    console.log("MovementFormData", movement);

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await MovementAPI.updateMovement(
            entity.id,
            movement
          );
          message = "Movement updated successfully";
        } else {
          alert("Cannot update the Movement");
          console.error("Not valid entity", entity);
        }
      } else {
        result = await MovementAPI.createMovement(movement);
        message = "Movement created successfully";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/movements");
        }
      }
    } catch (error) {
      console.error("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = () => {
    cancelModal({
      onOk: () => navigate("/admin/movements"),
    });
  };

  const entityData = useMemo(() => {
    if (!entity) return null;
    if ("id" in entity) return entity;

    return null;
  }, [entity]);

  const productsListContainerStyles: React.CSSProperties = {
    maxHeight: "450px",
    overflowY: "auto",
  };

  return (
    <>
      <Content className="relative mx-4">
        <MovementsManageBreadcrumb />

        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            <MovementForm
              ref={MovementFormRef}
              entity={entityData}
              onMovementConpetChange={onMovementConceptSelected}
              onWorkOrderChange={onWorkOrderChange}
              onPurchaseRequisitionChange={onPurchaseRequisitionChange}/>
            {
              !!movementConcept ? (
                !selectingProducts ?
                (
                  <>
                    <div className="flex justify-between">
                      <h1 className="font-semibold mb-4" style={{fontSize: "1.75rem"}}>
                        {
                          movementConcept.name == 'Recepción de producción' && !selectedProducts.length ?
                          'Selecciona una requisición de compra'
                          :
                          'Captura los lotes de los productos'
                        }
                      </h1>
                    </div>
                    {
                      selectedProducts.map((product, index) => (
                        <ProductBatchForm
                          key={index}
                          product={product}
                          formRef={formRefs[index]}
                        />
                      ))
                    }
                  </>
                )
                :
                <>
                  <div className="flex justify-between">
                    <h1 className="font-semibold mb-4" style={{fontSize: "1.75rem"}}>Selecciona los productos</h1>
                    <button
                      type="button"
                      onClick={onProductSelectionDone}
                      className="h-min bg-green-500 text-white px-4 py-2 rounded-md transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
                      Hecho
                    </button>
                  </div>
                  <div style={productsListContainerStyles}>
                    <ProductsList
                      enableSelection={true}
                      mode="selection-only"
                      onSelectionChange={setSelectedProducts}
                    />
                  </div>
                </>
              ) : null
            }

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
