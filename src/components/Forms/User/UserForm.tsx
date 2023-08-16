import { Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export type UserFormHandle = {
  getFormData: () => Promise<FieldType>;
};

const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): UserFormHandle => ({
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
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm password"
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your password again!" },
        ]}>
        <Input.Password />
      </Form.Item>
    </Form>
  );
});

export default UserForm;
