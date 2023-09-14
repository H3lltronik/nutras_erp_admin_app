import { Form, Input, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { roles } from "./roles";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type ProfilesFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Profile>;
};

type ProfileFormProps = {
  entity?: Profile | null;
};

const ProfilesForm = forwardRef<ProfilesFormHandle, ProfileFormProps>(
  (props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      (): ProfilesFormHandle => ({
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
      if (props.entity) form.setFieldsValue(props.entity);
    }, [form, props.entity]);

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
        <Form.Item<Profile> label="Id" name="id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item<Profile>
          label="Nombre"
          name="name"
          rules={[{ required: true && !isDraft, message: "Please input the name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item<Profile>
          label="Roles"
          name="roles"
          rules={[{ required: true && !isDraft, message: "Please select some roles!" }]}>
          <Select
            placeholder="Select a roles"
            mode="multiple"
            options={selectOptions}></Select>
        </Form.Item>
      </Form>
    );
  }
);

export default ProfilesForm;
