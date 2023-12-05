import { Col, Form, Input, Row, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { WarehousesAPI } from "../../../api";
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

  useImperativeHandle(
    ref,
    (): InventoryMovementFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
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
    </Form>
  );
});

export default InventoryMovementForm;
