import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";
import { MovementConceptAPI, MovementTypeAPI, WarehousesAPI, WorkOrderAPI, PurchaseRequisitionAPI } from "../../../api";
import moment from "moment-timezone";
import { GetWorkOrdersResponse, WorkOrder } from "../../../api/workOrder/types";
import { GetPurchaseRequisitionsResponse, PurchaseRequisition } from "../../../api/purchaseRequisition/types";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
  user: any;
}

export type MovementFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Movement>;
  resetField: (fieldName: string) => void;
};

type MovementFormProps = {
  entity?: Movement | null;
  disableProductSelection?: boolean;
  onMovementConpetChange?: (movementConcept: MovementConcept) => void;
  onWorkOrderChange?: (workOrder: WorkOrder) => void;
  onPurchaseRequisitionChange?: (purchaseRequisition: PurchaseRequisition) => void;
};

const MovementForm = forwardRef<MovementFormHandle, MovementFormProps>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [purchasesRequisitions, setPurchasesRequisitions] = useState<GetPurchaseRequisitionsResponse[]>([]);
  const [workOrders, setWorkOrders] = useState<GetWorkOrdersResponse[]>([]);
  const [movementConcepts, setMovementConcepts] = useState<GetMovementConceptsResponseData[]>([]);
  const [movementTypes, setMovementTypes] = useState<GetMovementTypesResponseData[]>([]);
  const [warehouses, setWarehouses] = useState<GetWarehousesResponse[]>([]);
  const [warehousesToShow, setWarehousesToShow] = useState<GetWarehousesResponse[]>([]);
  const [disableOriginWarehouse, setDisableOriginWarehouse] = useState<boolean>(true);
  const [date, setDate] = useState<moment.Moment>(moment());

  const onMovementConceptSelected = (value: string) => {
    const movementConcept = movementConcepts.find((concept) => concept.id === value);
    _props.onMovementConpetChange ? _props.onMovementConpetChange(movementConcept) : null;
    const movementType = movementTypes.find((type) => type.id === movementConcept?.movementTypeId);
    const filteredWarehouses = warehouses.filter((warehouse) => {
      if(!!movementConcept.originWarehouseId) return true;
      return !warehouse.hidden;
    });
    setDisableOriginWarehouse(!!movementConcept.originWarehouseId);
    setWarehousesToShow(filteredWarehouses);
    form.setFieldsValue({
      movementTypeId: movementType?.id,
      destinyWarehouseId: movementConcept.destinyWarehouseId,
      originWarehouseId: movementConcept.originWarehouseId,
    });
  }
  
  const showWorkOrderSelector = (movementConceptId: string): boolean => {
    const movementConcept = movementConcepts.find((concept) => concept.id === movementConceptId);
    return movementConcept?.name?.toLowerCase() == "Adquisición de mercancía".toLowerCase();
  }

  const showRequisitionRelatedOcSelector = (movementConceptId: string): boolean => {
    const movementConcept = movementConcepts.find((concept) => concept.id === movementConceptId);
    return movementConcept?.name?.toLowerCase() == "Recepción de producción".toLowerCase();
  }

  const onWorkOrderSelected = (value: string) => {
    const workOrder = workOrders.find((workOrder) => workOrder.id === value);
    _props.onWorkOrderChange ? _props.onWorkOrderChange(workOrder) : null;
  }

  const onPurchaseRequisitionSelected = (value: string) => {
    const purchaseRequisition = purchasesRequisitions.find((purchaseRequisition) => purchaseRequisition.id === value);
    _props.onPurchaseRequisitionChange ? _props.onPurchaseRequisitionChange(purchaseRequisition) : null;
  }

  useImperativeHandle(
    ref,
    (): MovementFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
        return {
          ...form.getFieldsValue(),
          userId: params?.user?.id,
          user: params?.user,
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
        };
      },
      resetField: (fieldName) => {
        form.setFieldValue(fieldName, null);
      },
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);

    const getMovementsConcept = async () => {
      try {
        const movementsConcept = await MovementConceptAPI.getAll();
        setMovementConcepts(movementsConcept.data);
      } catch (error) {
        console.error("Error getting MovementConcepts");
      }
    }

    const getMovementsType = async () => {
      try {
        const movementsType = await MovementTypeAPI.getAll();
        setMovementTypes(movementsType.data);
      } catch (error) {
        console.error("Error getting MovementTypes");
      }
    }

    const getWarehouses = async () => {
      try {
        const warehouses = await WarehousesAPI.getWarehouses();
        setWarehouses(warehouses.data);
      } catch (error) {
        console.error("Error getting Warehouses");
      }
    }

    const getWorkOrders = async () => {
      try {
        const workOrders = await WorkOrderAPI.findWorkOrders();
        setWorkOrders(workOrders.data);
      } catch (error) {
        console.error("Error getting WorkOrders");
      }
    }

    const getPurchasesRequisitions = async () => {
      try {
        const purchasesRequisitions = await PurchaseRequisitionAPI.findPurchaseRequisitions();
        setPurchasesRequisitions(purchasesRequisitions.data);
      } catch (error) {
        console.error("Error getting PurchasesRequisitions");
      }
    }

    getMovementsConcept();
    getMovementsType();
    getWarehouses();
    getWorkOrders();
    getPurchasesRequisitions();
  }, [form, _props.entity]);

  return (
    <Form
      form={form}
      name="MovementForm"
      initialValues={{ remember: true, userId: useAuth().user?.id, date: date.format('YYYY-MM-DD') }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Fecha" name="date">
            <Input disabled type="date"></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Orden de trabajo" name="ot_id">
            <Select onChange={onWorkOrderSelected}>
              {
                workOrders.map((workOrder) => {
                  return <Select.Option key={workOrder.id} value={workOrder.id}>{workOrder.folio}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Concepto de movimiento" name="movementConceptId">
            <Select onChange={onMovementConceptSelected}>
              {
                movementConcepts.map((concept) => {
                  return <Select.Option key={concept.id} value={concept.id}>{concept.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tipo de movimiento" name="movementTypeId" shouldUpdate>
            <Select disabled>
              {
                movementTypes.map((type) => {
                  return <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {
        showWorkOrderSelector(form.getFieldValue('movementConceptId')) ?
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Orden de compra relacionada" name="ocId" shouldUpdate>
                <Select allowClear>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        :
        showRequisitionRelatedOcSelector(form.getFieldValue('movementConceptId')) ?
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Requisición relacionada" name="requisitionId" shouldUpdate>
              <Select allowClear onChange={onPurchaseRequisitionSelected}>
                {
                  purchasesRequisitions.map((requisition) => {
                    return <Select.Option key={requisition.id} value={requisition.id}>{requisition.folio}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        : null
      }

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Origen" name="originWarehouseId" shouldUpdate>
            <Select disabled={disableOriginWarehouse}>
              {
                warehousesToShow.map((warehouse) => {
                  return <Select.Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Destino" name="destinyWarehouseId" shouldUpdate>
            <Select disabled>
              {
                warehouses.map((warehouse) => {
                  return <Select.Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default MovementForm;
