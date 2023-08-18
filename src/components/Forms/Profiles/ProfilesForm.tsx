import { Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { roles } from "./roles";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export type ProfilesFormHandle = {
  getFormData: () => Promise<FieldType>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfilesForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    (): ProfilesFormHandle => ({
      getFormData: async () => {
        const valid = await form.validateFields();
        console.log("valid", valid);
        return form.getFieldsValue();
      },
    })
  );

  const selectOptions = useMemo(() => {
    return roles.map((role) => {
      return {
        label: role.label,
        options: role.roles.map((value) => {
          return {
            label: value.description,
            value: value.role,
            id: value.role,
          };
        }),
      };
    });
  }, []);

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Roles"
        name="roles"
        rules={[{ required: true, message: "Please select some roles!" }]}>
        <Select
          placeholder="Select a roles"
          mode="multiple"
          options={selectOptions}></Select>
      </Form.Item>
    </Form>
  );
});

export default ProfilesForm;
