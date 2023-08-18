import { Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
};

export type MeasurementTypeFormHandle = {
  getFormData: () => Promise<FieldType>;
};

const MeasurementTypeForm = forwardRef((_props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): MeasurementTypeFormHandle => ({
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
        rules={[
          {
            required: true,
            message: "Please input your measurement type name!",
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Abreviation"
        name="abrev"
        rules={[
          {
            required: true,
            message: "Please input your measurement type abreviation!",
          },
        ]}>
        <Input />
      </Form.Item>
    </Form>
  );
});

export default MeasurementTypeForm;
