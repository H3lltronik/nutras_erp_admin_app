import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, Row, Select } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
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

interface GetFormData {
  draftMode: boolean;
}

export type UserFormHandle = {
  getFormData: (params?: GetFormData) => Promise<User>;
};

type UserFormProps = {
  entity?: User | null;
};

const UserForm = forwardRef<UserFormHandle, UserFormProps>((props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const { data: profilesData, isLoading: loadingProfiles } =
    useAdminQuery("profiles");

  const { data: departmentsData, isLoading: loadingDepartments } = useQuery<
    GetDepartmentsResponse | APIError
  >({
    queryKey: ["departments"],
    queryFn: DepartmentsAPI.getDepartments,
  });

  useImperativeHandle(
    ref,
    (): UserFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
        console.log("valid", valid);
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

  const departments = useMemo(() => {
    if (loadingDepartments || !departmentsData) return [];
    if ("data" in departmentsData) return departmentsData.data;

    return [];
  }, [departmentsData, loadingDepartments]);

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<FieldType> label="Id" name="id" hidden={true}>
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12} lg={8} xl={6}>
          <Form.Item<FieldType>
            label="Nombre"
            name="name"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es requerido",
              },
            ]}>
            <Input
              placeholder="Nombre"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8} xl={6}>
          <Form.Item<FieldType>
            label="Nombre de usuario"
            name="username"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es requerido",
              },
            ]}>
            <Input
              placeholder="Nombre de usuario"
              type="email"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8} xl={6}>
          {props.entity == null && (
            <Form.Item<FieldType>
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
              ]}>
              <Input.Password
                placeholder="Contraseña"
              />
            </Form.Item>
          )}
        </Col>
        {props.entity == null && (
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<FieldType>
              label="Confirmar contraseña"
              name="confirmPassword"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es requerido",
                },
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
              <Input.Password
                placeholder="Confirmar contraseña"
              />
            </Form.Item>
          </Col>
        )}
        {props.entity && (
          <Col xs={24} md={12} lg={8} xl={6}>
            <Form.Item<FieldType>
              label="Nueva contraseña"
              name="newPassword"
              rules={[{ required: false && !isDraft }]}>
              <Input.Password />
            </Form.Item>
          </Col>
        )}
        <Col xs={24} md={12} lg={8} xl={6}>
          <Form.Item<FieldType>
            label="Perfil"
            name="profileId"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es requerido",
              },
            ]}>
            <Select
              placeholder="Selecciona un perfil"
              allowClear
              loading={loadingProfiles}>
              {profilesData?.data.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={8} xl={6}>
          <Form.Item<FieldType>
            label="Departamento"
            name="departmentId"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es requerido",
              },
            ]}>
            <Select
              placeholder="Selecciona un departamento"
              allowClear
              loading={loadingDepartments}>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default UserForm;
