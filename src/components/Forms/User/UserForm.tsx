import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { DepartmentsAPI } from "../../../api";
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

type UserFormProps = {
  entity?: User | null;
};

const UserForm = forwardRef<UserFormHandle, UserFormProps>((props, ref) => {
  const [form] = Form.useForm();
  const { data: profilesData, isLoading: loadingProfiles } =
    useAdminQuery("profiles");

  const { data: departmentsData, isLoading: loadingDepartments } = useQuery<
    GetDepartmentsResponse | APIError
  >(["departments"], () => DepartmentsAPI.getDepartments());

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

  useEffect(() => {
    if (props.entity) form.setFieldsValue(props.entity);
  }, [form, props.entity]);

  const departments = useMemo(() => {
    if (loadingDepartments || !departmentsData) return [];
    if ("data" in departmentsData) return departmentsData.data;

    return [];
  }, [departmentsData, loadingDepartments]);

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType> label="Id" name="id" hidden={true}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      {props.entity == null && (
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
      )}

      {props.entity == null && (
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
      )}

      {props.entity && (
        <Form.Item<FieldType>
          label="New password"
          name="newPassword"
          rules={[{ required: false }]}>
          <Input.Password />
        </Form.Item>
      )}

      {props.entity && (
        <Form.Item<FieldType>
          label="Confirm old password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your OLD password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
      )}

      <Form.Item<FieldType>
        label="Profile"
        name="profileId"
        rules={[{ required: true, message: "Please select a profile!" }]}>
        <Select
          placeholder="Select a profile"
          allowClear
          loading={loadingProfiles}>
          {profilesData?.data.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Department"
        name="departmentId"
        rules={[{ required: true, message: "Please select a department!" }]}>
        <Select
          placeholder="Select a department"
          allowClear
          loading={loadingDepartments}>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default UserForm;
