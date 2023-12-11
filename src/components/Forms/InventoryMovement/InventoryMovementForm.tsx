import { Col, DatePicker, Form, Input, Row, Typography } from "antd";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MovementConceptAPI,
  MovementTypeAPI,
  WarehousesAPI,
} from "../../../api";
import { defaultRequiredRules } from "../../../lib/common/forms";
import { BatchesList } from "../../../pages/Batches";
import BatchForm, { BatchFormHandle } from "../Batch/BatchForm";
import { FormList, FormListHandle } from "../Common/FormList";
import { GenericSelect } from "../Common/GenericSelect";
import { movementTypeMapping, section2ModeMapping } from "./mappings";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type InventoryMovementFormHandle = {
  getFormData: (params?: GetFormData) => Promise<InventoryMovement>;
};

type InventoryMovementFormProps = {
  entity?: InventoryMovement | null;
};

const InventoryMovementForm = forwardRef<
  InventoryMovementFormHandle,
  InventoryMovementFormProps
>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const formListRef = useRef<FormListHandle>(null);
  const movementConceptId = Form.useWatch("movementConcept", form);
  const [movementTypeId, setMovementTypeId] = useState<string | null>(null);

  useImperativeHandle(
    ref,
    (): InventoryMovementFormHandle => ({
      getFormData: async (params) => {
        console.log("getFormData", params);
        setIsDraft(!!params?.draftMode);

        // const valid = await form.validateFields();
        const allValid = await formListRef.current?.getAllFormsData();
        console.log("allValid", allValid);

        return {
          ...form.getFieldsValue(),
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
        };
      },
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);

    form.setFieldValue("understood", false);
  }, [form, _props.entity]);

  useEffect(() => {
    if (movementConceptId) {
      setMovementTypeId(movementTypeMapping[movementConceptId]);
    }
  }, [movementConceptId]);

  type section2ModeType = "entry" | "exit" | null;
  const section2Mode: section2ModeType = useMemo(() => {
    if (!movementTypeId) return null;

    return section2ModeMapping[movementTypeId] as section2ModeType;
  }, [movementTypeId]);

  return (
    <Form
      form={form}
      name="InventoryMovementForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Folio"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <Input placeholder="Generado al procesar..." disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="OT Relacionada"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la OT relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Fecha"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <DatePicker className="w-full" placeholder="Fecha" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Concepto de movimiento"
            rules={defaultRequiredRules(isDraft)}
            name="movementConcept">
            <GenericSelect
              fetcher={() => MovementConceptAPI.getAll()}
              optionKey="id"
              optionLabel="name"
              queryKey={["movementConcepts"]}
              placeholder="Selecciona un concepto de movimiento"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tipo de movimiento">
            <GenericSelect
              fetcher={() => MovementTypeAPI.getAll()}
              optionKey="id"
              optionLabel="name"
              queryKey={["movementTypes"]}
              placeholder="Selecciona un tipo de movimiento"
              value={movementTypeId}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Almacen de salida"
            name="fromId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona un almacen"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Almacen de entrada"
            name="toId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona un almacen"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="OC Relacionada"
            name="ocId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la OC relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Requisición Relacionada"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la requisición relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className="mt-5">
        <Col span={24}>
          <Typography.Title level={3}>Seccion de lotes</Typography.Title>
        </Col>
      </Row>
      {section2Mode === "entry" && (
        <>
          <FormList
            ref={formListRef}
            renderForm={(ref: Ref<BatchFormHandle>) => <BatchForm ref={ref} />}
            getFormData={(formHandle: BatchFormHandle) =>
              formHandle.getFormData()
            }
          />
        </>
      )}

      {section2Mode === "exit" && (
        <>
          <div className="">
            Seleccionando Lotes del almacen: <strong>General</strong>
          </div>
          <BatchesList />
        </>
      )}
    </Form>
  );
});

export default InventoryMovementForm;
