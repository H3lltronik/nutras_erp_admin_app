import { Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type ProviderFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Provider>;
};

type ProviderFormProps = {
  entity?: Provider | null;
};

const ProviderForm = forwardRef<ProviderFormHandle, ProviderFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      (): ProviderFormHandle => ({
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

    return (
      <Form
        form={form}
        name="providerForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<Provider> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<Provider>
              label="Nombre Común"
              name="name"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<Provider>
              label="Descripcion"
              name="description"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default ProviderForm;
