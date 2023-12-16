import { Col, DatePicker, Form, Input, InputNumber, Row, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";

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
};

type MovementFormProps = {
  entity?: Movement | null;
  disableProductSelection?: boolean;
};

const MovementForm = forwardRef<MovementFormHandle, MovementFormProps>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);
  }, [form, _props.entity]);

  const onSelectionChange = (selectedRows: Product[]) => {
    if (selectedRows.length > 0) setSelectedProduct(selectedRows[0]);
  };

  return (
    <Form
      form={form}
      name="MovementForm"
      initialValues={{ remember: true, userId: useAuth().user?.id }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<Movement> name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item<Movement>
            label="Código"
            name="code"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<Movement>
            label="Cantidad"
            name="quantity"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <InputNumber className="w-full" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<Movement>
            label="Fecha de expiracion"
            name="expirationDate"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<Movement>
            label="Activo"
            name="isActive"
            valuePropName="checked"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {selectedProduct && (
          <Col span={24}>
            <span className="text-xl">Seleccionado: </span>
            <span className="font-bold text-xl">
              {selectedProduct.commonName}
            </span>
          </Col>
        )}
        <Col span={24}>
          <ProductsList
            mode="selection-only"
            enableSelection={true}
            selectionLimit={1}
            onSelectionChange={onSelectionChange}
            defaultFilters={{
              published: true,
            }}
            disabledFilters={{
              status: true,
            }}
          />
        </Col>
      </Row>
    </Form>
  );
});

export default MovementForm;
