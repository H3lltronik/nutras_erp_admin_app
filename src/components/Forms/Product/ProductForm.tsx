import { Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
  code?: string;
  type?: string;
  description?: string;
};

export type ProductFormHandle = {
  getFormData: () => Promise<FieldType>;
};

const ProductForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): ProductFormHandle => ({
      getFormData: async () => {
        const valid = await form.validateFields();
        console.log("valid", valid);
        return form.getFieldsValue();
      },
    })
  );

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your product name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input your product code!" }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Type"
        name="type"
        rules={[
          { required: true, message: "Please input your product type!" },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input your product description!" },
        ]}>
        <Input />
      </Form.Item>
    </Form>
  );
});

export default ProductForm;
