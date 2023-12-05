import { Col, Form, Input, Row } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { urlWithGetKeyToJson } from "../../../lib/entity.utils";
import {
  BatchFormResult,
  BatchToPost,
} from "../../../pages/Batchs/lib/formatBatchForm";
import { GenericSelect } from "../Common/GenericSelect";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type BatchFormHandle = {
  getFormData: (params?: GetFormData) => Promise<BatchFormResult>;
};

type BatchFormProps = {
  entity?: Batch | null;
};

const BatchForm = forwardRef<BatchFormHandle, BatchFormProps>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const location = useLocation();

  useImperativeHandle(
    ref,
    (): BatchFormHandle => ({
      getFormData: async (params) => {
        setIsDraft(!!params?.draftMode);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const valid = await form.validateFields();

        return {
          ...form.getFieldsValue(),
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
        };
      },
    })
  );

  const defaultValuesFromUrl = useMemo(() => {
    return urlWithGetKeyToJson(
      location.search,
      "defaultValues"
    ) as Batch | null;
  }, [location]);

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);

    if (defaultValuesFromUrl) form.setFieldsValue(defaultValuesFromUrl);
  }, [form, _props.entity, defaultValuesFromUrl]);

  return (
    <Form
      form={form}
      name="productForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<BatchToPost> name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Producto"
            name="productId"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es requerido",
              },
            ]}>
            <GenericSelect
              fetcher={() => ProductAPI.getProducts()}
              placeholder="Selecciona un producto"
              optionLabel="commonName"
              optionKey={"id"}
              queryKey={["products"]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default BatchForm;
