import { Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type ProductKosherFormHandle = {
  getFormData: (params?: GetFormData) => Promise<KosherDetails>;
};

type ProductKosherFormProps = {
  entity?: KosherDetails | null;
  mode?: FormMode;
};

const ProductKosherForm = forwardRef<
  ProductKosherFormHandle,
  ProductKosherFormProps
>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const certificateValidity = Form.useWatch("certificateValidity", form);

  useEffect(() => {
    console.log("certificateValidity", certificateValidity);
  }, [certificateValidity]);

  useImperativeHandle(
    ref,
    (): ProductKosherFormHandle => ({
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
    if (_props.entity) {
      form.setFieldsValue({
        ..._props.entity,
        certificateValidity: _props.entity.certificateValidity
          ? dayjs(_props.entity.certificateValidity)
          : null,
      });
    }
  }, [form, _props.entity]);

  return (
    <Form
      form={form}
      name="productKosherForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<KosherDetails> name="id" style={{ display: "none" }}>
        <Input disabled={_props.mode === "view"} />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="Agencia Kosher"
            name="agency"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Input disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="KID/UKD"
            name="kidOrUkd"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Input disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="Compañía Certificada"
            name="certifiedCompany"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Input disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="Numero de página del certificado"
            name="certificatePageNumber"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Este campo solo admite números",
              },
            ]}>
            <Input disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="Nombre en el certificado"
            name="nameOnCertificate"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <Input disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12} xl={8} className="mb-5">
          <Form.Item<KosherDetails>
            label="Vigencia del certificado"
            name="certificateValidity"
            rules={[
              {
                required: true && !isDraft,
                message: "Este campo es obligatorio",
              },
            ]}>
            <DatePicker disabled={_props.mode === "view"} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default ProductKosherForm;
