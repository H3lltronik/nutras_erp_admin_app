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

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type WorkOrderFormHandle = {
  getFormData: (params?: GetFormData) => Promise<WorkOrder>;
};

type WorkOrderFormProps = {
  entity?: WorkOrder | null;
};

const WorkOrderForm = forwardRef<WorkOrderFormHandle, WorkOrderFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);

    const { data: measurementsData, isLoading: loadingMeasurements } = useQuery<
      GetMeasurementsResponse | APIError
    >(["measurements"], () => MeasurementAPI.getMeasurements());

    useImperativeHandle(
      ref,
      (): WorkOrderFormHandle => ({
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
        name="WorkOrderForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<WorkOrder> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Nombre Común"
              name="commonName"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Descripción del Proveedor"
              name="vendorDescription"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Código"
              name="code"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Estado"
              name="status"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Proveedor"
              name="provider"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Código Alternativo"
              name="codeAlt"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Presentación"
              name="presentation"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Cantidad"
              name="quantity"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Unidad de Medida"
              name="unitId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
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
            <Form.Item<WorkOrder>
              label="Alérgeno"
              name="allergen"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Agencia Kosher"
              name="kosherAgency"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Vendedor"
              name="vendor"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<WorkOrder>
          label="Nombre del Ingrediente de la Empresa"
          name="companyIngredientName"
          rules={[
            {
              required: true && !isDraft,
              message: "Este campo es obligatorio",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<WorkOrder>
          label="Nombre del Certificado"
          name="certificateName"
          rules={[
            {
              required: true && !isDraft,
              message: "Este campo es obligatorio",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item<WorkOrder>
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

export default WorkOrderForm;