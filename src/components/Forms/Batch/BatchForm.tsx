import { Col, DatePicker, Form, Input, InputNumber, Row, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";

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

export type BatchFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Batch>;
};

type BatchFormProps = {
  entity?: Batch | null;
  disableProductSelection?: boolean;
};

const BatchForm = forwardRef<BatchFormHandle, BatchFormProps>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    (): BatchFormHandle => ({
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

  return (
    <Form
      form={form}
      name="BatchForm"
      initialValues={{ remember: true, userId: useAuth().user?.id }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<Batch> name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item<Batch>
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
          <Form.Item<Batch>
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
          <Form.Item<Batch>
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
          <Form.Item<Batch>
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
    </Form>
  );
});

export default BatchForm;
