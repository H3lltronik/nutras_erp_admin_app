import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { MeasurementAPI } from "../../../api";
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

export type WorkRequestFormHandle = {
  getFormData: (params?: GetFormData) => Promise<WorkRequest>;
};

type WorkRequestFormProps = {
  entity?: WorkRequest | null;
};

const WorkRequestForm = forwardRef<WorkRequestFormHandle, WorkRequestFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);

    useImperativeHandle(
      ref,
      (): WorkRequestFormHandle => ({
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
        name="WorkRequestForm"
        initialValues={{ remember: true, userId: useAuth().user?.id }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<WorkRequest> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Form.Item<WorkRequest>
          label="Folio"
          name="folio"
          rules={[
            {
              required: true && !isDraft,
              message: "Este campo es obligatorio",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<WorkRequest>
          label="Nota"
          name="note"
          rules={[
            {
              required: true && !isDraft,
              message: "Este campo es obligatorio",
            },
          ]}>
          <Input.TextArea />
        </Form.Item>

        {/* Add other form controls like Submit button, etc. if needed */}
      </Form>
    );
  }
);

export default WorkRequestForm;
