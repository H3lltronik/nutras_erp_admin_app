import { useQuery } from "@tanstack/react-query";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { MeasurementAPI } from "../../../api";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
  code?: string;
  type?: string;
  description?: string;
};

export type ProductFormHandle = {
  getFormData: () => Promise<FieldType>;
};

type ProductFormProps = {
  entity?: Product | null;
};

const ProductForm = forwardRef<ProductFormHandle, ProductFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const { data: measurementsData, isLoading: loadingMeasurements } = useQuery<
      GetMeasurementsResponse | APIError
    >(["measurements"], () => MeasurementAPI.getMeasurements());

    useImperativeHandle(
      ref,
      (): ProductFormHandle => ({
        getFormData: async () => {
          const valid = await form.validateFields();
          console.log("valid", valid);
          return form.getFieldsValue();
        },
      })
    );

    useEffect(() => {
      if (_props.entity) form.setFieldsValue(_props.entity);
    }, [form, _props.entity]);

    const measurements = useMemo(() => {
      if (loadingMeasurements || !measurementsData) return [];
      if ("data" in measurementsData) return measurementsData.data;

      return [];
    }, [measurementsData, loadingMeasurements]);

    return (
      <Form
        form={form}
        name="productForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<FieldType> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Common Name"
              name="commonName"
              rules={[
                { required: true, message: "Please input the common name!" },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Vendor Description"
              name="vendorDescription">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Code"
              name="code"
              rules={[
                { required: true, message: "Please input the product code!" },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Status" name="status">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType> label="Provider" name="provider">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Alternate Code" name="codeAlt">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType> label="Presentation" name="presentation">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Quantity" name="quantity">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Unidad de medida"
              name="unit"
              rules={[
                {
                  required: true,
                  message: "Please select a measurement unit!",
                },
              ]}>
              <Select
                placeholder="Select a measurement unit"
                allowClear
                loading={loadingMeasurements}>
                {measurements.map((measurement) => (
                  <option key={measurement.id} value={measurement.id}>
                    {measurement.name}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Allergen" name="allergen">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType> label="Kosher Agency" name="kosherAgency">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label="Vendor" name="vendor">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label="Company Ingredient Name"
          name="companyIngredientName">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Certificate Name" name="certificateName">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Note" name="note">
          <Input.TextArea />
        </Form.Item>

        {/* Add other form controls like Submit button, etc. if needed */}
      </Form>
    );
  }
);

export default ProductForm;
