import { Col, Form, Input, Row } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ProductAPI } from "../../../api";
import { PurchaseRequisitionProduct } from "../../../api/purchaseRequisition/types";
import { defaultRequiredRules } from "../../../lib/common/forms";
import { GenericSelect } from "../Common/GenericSelect";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
  user: any | undefined;
}

export type PurchaseRequisitionProductFormHandle = {
  getFormData: (params?: GetFormData) => Promise<PurchaseRequisitionProduct>;
};

type PurchaseRequisitionProductFormProps = {
  entity?: PurchaseRequisitionProduct | null;
};

const PurchaseRequisitionProductForm = forwardRef<
  PurchaseRequisitionProductFormHandle,
  PurchaseRequisitionProductFormProps
>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    (): PurchaseRequisitionProductFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);

        await form.validateFields();
        const formData = form.getFieldsValue();
        return {
          ...formData,
          quantity: Number(formData.quantity),
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
        };
      },
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);
  }, [form, _props.entity]);

  return (
    <Form
      form={form}
      name="PurchaseRequisitionProductForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<PurchaseRequisitionProduct>
        name="id"
        style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<PurchaseRequisitionProduct>
            label="Producto"
            name="product_id"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => ProductAPI.getProducts()}
              placeholder="Selecciona un producto"
              optionLabel="commonName"
              optionKey={"id"}
              queryKey={["products"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<PurchaseRequisitionProduct>
            label="Cantidad"
            name="quantity"
            rules={defaultRequiredRules(isDraft)}>
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default PurchaseRequisitionProductForm;
