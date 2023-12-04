import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { MeasurementAPI, ProductAPI, WorkRequestAPI } from "../../../api";
import useAuth from "../../../hooks/useAuth";
import { GenericSelect } from "../Common/GenericSelect";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
  user: any | undefined;
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
          const formData = form.getFieldsValue();
          return {
            ...formData,
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
        autoComplete="off"
      >
        <Form.Item<WorkOrder> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Solicitud de trabajo"
              name="stId"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <GenericSelect
                fetcher={() => WorkRequestAPI.getWorkRequests()}
                placeholder="Selecciona una unidad de medida"
                optionLabel="folio"
                optionKey={"id"}
                queryKey={["workRequests"]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Folio"
              name="folio"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Fecha de entrega solicitada por cliente"
              name="clientRequestDate"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Fecha de entrega interna"
              name="internDueDate"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Producto"
              name="product"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <GenericSelect
                fetcher={() => ProductAPI.getProducts()}
                placeholder="Selecciona una un producto"
                optionLabel="commonName"
                optionKey={"id"}
                queryKey={["products"]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Notas"
              name="notes"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<WorkOrder>
              label="Tipo de servicio"
              name="serviceType"
              rules={[
                {
                  required: true && !isDraft,
                  message: "Este campo es obligatorio",
                },
              ]}
            >
              <Select placeholder="Selecciona un tipo de servicio">
                <Select.Option value="Desarrollo">Desarrollo</Select.Option>
                <Select.Option value="Producción">Producción</Select.Option>
                <Select.Option value="Maquila">Maquila</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default WorkOrderForm;
