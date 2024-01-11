import { useMutation, useQuery } from "@tanstack/react-query";
import { Collapse, Layout } from "antd";
import React, { MutableRefObject, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovementAPI } from "../../../api";
import { PurchaseRequisition } from "../../../api/purchaseRequisition/types";
import { WorkOrder } from "../../../api/workOrder/types";
import { AppLoader } from "../../../components/Common/AppLoader";
import MovementForm, {
  MovementFormHandle,
} from "../../../components/Forms/Movement/MovementForm";
import useAuth from "../../../hooks/useAuth";
import { cancelModal, showToast } from "../../../lib/notify";
import { ProductsList } from "../../Products";
import { MovementsManageBreadcrumb } from "../Common/Breadcrums";
import ProductBatchForm from "../Common/ProductBatchForm";
import { WorkOrder } from "../../../api/workOrder/types";
import { PurchaseRequisition } from "../../../api/purchaseRequisition/types";
import { DeleteFilled, DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";

const { Content } = Layout;

export const MovementsManage: React.FC = () => {
  const user = useAuth().user;
  const MovementFormRef = useRef<MovementFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = React.useState<any[]>([]);
  const [movementConcept, setMovementConcept] = React.useState<MovementConcept | null>(null);

  const { mutateAsync } = useMutation<unknown>((id: string, data: Movement) =>
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

  const resetFormVariables = (resetProducts: boolean = true) => {
    MovementFormRef.current?.resetField('requisitionId');
    setMovementConcept(movementConcept);
    if(resetProducts) setSelectedProducts([]);
  }

  const onProductSelectionChange = (products: Product[]) => {
    if(!products || !products.length) return;
    setSelectedProducts(products.map((product: any) => {
      product.batchesForms = [React.createRef()];
      return product;
    }));
  }

  const onMovementConceptSelected = (newMovementConcept: MovementConcept) => {
    resetFormVariables(movementConcept?.name );
    setMovementConcept(newMovementConcept);
    console.log("newMovementConcept", newMovementConcept);
  }

  const onWorkOrderChange = (workOrder: WorkOrder) => {
  }

  const onPurchaseRequisitionChange = (
    purchaseRequisition: PurchaseRequisition
  ) => {
    if (purchaseRequisition) {
      const productsList = purchaseRequisition.purchase_requisition_products;
      setSelectedProducts(productsList.map((product) => {
        let productMapped: any = product.product;
        productMapped.quantity = product.quantity;
        productMapped.batchesForms = [React.createRef()];
        return productMapped;
      }));
    }
  };

  const getProductBatchFormMode = () => {
    if(movementConcept?.movementType.action != 'input') {
      return 'select';
    }
    return 'create';
  }

  const submitForm = async (isDraft = false) => {
    const MovementFormData = (await MovementFormRef.current?.getFormData({
      draftMode: isDraft,
      user,
    })) as CreateMovementRequest;
    let movement: any = {...MovementFormData};
    if(getProductBatchFormMode() === 'create') {
      movement.products = selectedProducts.map((product) => {
        product.batches = product.batchesForms.map((batchForm: MutableRefObject<any>) => {
          return batchForm?.current?.getFieldsValue();
        });
        return product;
      });
    }
    else movement.products = [...selectedProducts];
    movement.fromId = movement.originWarehouseId;
    movement.toId = movement.destinyWarehouseId;
    console.log("MovementFormData", movement);
    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity) {
        if ("id" in entity) {
          result = await MovementAPI.updateMovement(entity.id, movement);
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
            <Collapse accordion size="large" defaultActiveKey={1}>
              <Collapse.Panel
                key={1}
                header={
                  <h2 className="font-bold">Selecciona los productos</h2>
                }
              >
                <ProductsList
                  enableSelection={true}
                  mode="selection-only"
                  onSelectionChange={onProductSelectionChange}
                />
              </Collapse.Panel>

              <Collapse.Panel
                key={2}
                header={
                  <h2 className="font-bold">Productos seleccionados</h2>
                }
              >
                {
                  !!selectedProducts && !!selectedProducts.length ? (
                    <>
                      <Collapse accordion size="middle">
                        {
                          selectedProducts.map((product, index) => (
                            <Collapse.Panel
                              key={index}
                              header={
                                <>
                                  <span className="font-semibold">{product.commonName}</span>
                                </>
                              }
                              extra={<DeleteOutlined
                                style={{ color: 'red', fontSize: '1.1rem' }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectedProducts.splice(index, 1);
                                    setSelectedProducts([...selectedProducts]);
                                  }
                                }
                                />
                              }
                              className="border-none"
                              style={{ borderBottom: '1px solid #e8e8e8' }}
                            >
                              <div className="flex flex-col gap-3">
                                {
                                  product.batchesForms.map((batchForm: MutableRefObject<any>, index: number) => (
                                    <>
                                      {index > 0 && <hr className="w-full" />}
                                      <div className="flex items-center justify-between gap-3" key={index}>
                                        <ProductBatchForm
                                          mode={getProductBatchFormMode()}
                                          product={product}
                                          formRef={batchForm}
                                        />
                                        {
                                          product.batchesForms.length > 1 && (
                                            <DeleteFilled
                                              className="hover:cursor-pointer"
                                              style={{ color: 'red', fontSize: '1.1rem' }}
                                              onClick={() => {
                                                product.batchesForms.splice(index, 1);
                                                setSelectedProducts([...selectedProducts]);
                                              }}
                                            />
                                          )
                                        }
                                      </div>
                                    </>
                                  ))
                                }
                                {
                                  getProductBatchFormMode() === 'create' && (
                                    <div className="flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          product.batchesForms.push(React.createRef());
                                          setSelectedProducts([...selectedProducts]);
                                        }}
                                        className="flex items-center gap-2 border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline">
                                        <PlusCircleFilled style={{fontSize: "1rem"}} />
                                        Agregar lote
                                      </button>
                                    </div>
                                  )
                                }
                              </div>
                            </Collapse.Panel>
                          ))
                        }
                      </Collapse>
                    </>
                  ) : (
                    <>
                      <h2>No hay productos seleccionados</h2>
                    </>
                  )
                }
              </Collapse.Panel>
            </Collapse>

            {/* <section>
              <h1 className="text-2xl">Seleccion de lotes</h1>
              <BatchesList
                enableSelection={true}
                mode="selection-only"
                onSelectionChange={onLoteSelectionChange}
                perPage={5}
              />
            </section> */}

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
