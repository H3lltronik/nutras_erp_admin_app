import { Col, Form, Input, Row, Select, Typography } from "antd";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ProductAPI, WarehousesAPI } from "../../../api";
import BatchForm, { BatchFormHandle } from "../Batch/BatchForm";
import { FormList, FormListHandle } from "../Common/FormList";
import { GenericSelect } from "../Common/GenericSelect";

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

  useImperativeHandle(
    ref,
    (): InventoryMovementFormHandle => ({
      getFormData: async (params) => {
        console.log("getFormData", params);
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
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
  }, [form, _props.entity]);

  const handleMovementTypeChange = (value: string) => {
    console.log("value", value);
  };

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
        <Col span={12}>
          <Form.Item label="Tipo de movimiento">
            <Select
              onChange={handleMovementTypeChange}
              defaultValue={"entrada-salida"}>
              <Select.Option key={"entrada-salida"}>
                Entrada - Salida
              </Select.Option>
              <Select.Option key={"recolocacion"}>Recolocacion</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Producto"
            name="productId"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <GenericSelect
              fetcher={() => ProductAPI.getProducts()}
              placeholder="Selecciona un producto catalogo"
              optionLabel="commonName"
              optionKey={"id"}
              queryKey={["products"]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Almacen de salida"
            name="fromId"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
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
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona un almacen"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className="mt-5">
        <Col span={24}>
          <hr />
        </Col>
        <Col span={24}>
          <Typography.Title level={3}>Seccion de lotes</Typography.Title>
        </Col>
      </Row>

      <FormList
        ref={formListRef}
        renderForm={(ref: Ref<BatchFormHandle>) => <BatchForm ref={ref} />}
        getFormData={(formHandle: BatchFormHandle) => formHandle.getFormData()}
      />
    </Form>
  );
});

export default InventoryMovementForm;
