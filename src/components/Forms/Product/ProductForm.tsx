import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select } from "antd";
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
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Code"
          name="code"
          rules={[
            { required: true, message: "Please input your product code!" },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Type"
          name="type"
          rules={[
            { required: true, message: "Please input your product type!" },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your product description!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Unidad de medida"
          name="unitId"
          rules={[
            { required: true, message: "Please select a measurement unit!" },
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
      </Form>
    );
  }
);

export default ProductForm;
