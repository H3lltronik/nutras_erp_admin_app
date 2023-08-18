import { Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import useAdminQuery from "../../../hooks/useAdminAPI/useAdminQuery";

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

export type UserFormHandle = {
  getFormData: () => Promise<FieldType>;
};

const UserForm = forwardRef((_props, ref) => {
  const [form] = Form.useForm();
  const { data: profilesData, isLoading: loadingProfiles } =
    useAdminQuery("profiles");

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
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Profile"
        name="profileId"
        rules={[{ required: true, message: "Please select a profile!" }]}>
        <Select
          placeholder="Select a profile"
          allowClear
          loading={loadingProfiles}>
          {profilesData?.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default UserForm;
