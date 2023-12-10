import { useQuery } from "@tanstack/react-query";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { WarehousesAPI } from "../../../api";
import { defaultRequiredRules } from "../../../lib/common/forms";
import BatchForm, { BatchFormHandle } from "../Batch/BatchForm";
import { FormList, FormListHandle } from "../Common/FormList";
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

export type InventoryMovementFormHandle = {
  getFormData: (params?: GetFormData) => Promise<InventoryMovement>;
};

type InventoryMovementFormProps = {
  entity?: InventoryMovement | null;
};

const InventoryMovementForm = forwardRef<
  InventoryMovementFormHandle,
  InventoryMovementFormProps
>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const formListRef = useRef<FormListHandle>(null);
  const movementTypeId = Form.useWatch("productId", form);
  const exitWarehouseId = Form.useWatch("fromId", form);
  const entryWarehouseId = Form.useWatch("toId", form);
  const validatedUnderstood = Form.useWatch("understood", form);

  useImperativeHandle(
    ref,
    (): InventoryMovementFormHandle => ({
      getFormData: async (params) => {
        console.log("getFormData", params);
        setIsDraft(!!params?.draftMode);

        const valid = await form.validateFields();
        const allValid = await formListRef.current?.getAllFormsData();
        console.log("allValid", allValid);

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

    form.setFieldValue("understood", false);
  }, [form, _props.entity]);

  const handleMovementTypeChange = (value: string) => {
    console.log("value", value);
  };

  const { data: warehousesData } = useQuery(["rawWarehouses"], () =>
    WarehousesAPI.getWarehouses()
  );

  const exitWarehouse = useMemo(() => {
    if (!warehousesData) return "";
    if ("statusCode" in warehousesData) return "";
    console.log("warehousesData", warehousesData);

    const warehouse = warehousesData.data.find(
      (warehouse) => warehouse.id === exitWarehouseId
    );
    return warehouse?.name;
  }, [warehousesData, exitWarehouseId]);

  const entryWarehouse = useMemo(() => {
    if (!warehousesData) return "";
    if ("statusCode" in warehousesData) return "";

    const warehouse = warehousesData.data.find(
      (warehouse) => warehouse.id === entryWarehouseId
    );
    return warehouse?.name;
  }, [warehousesData, entryWarehouseId]);

  const movementType = useMemo(() => {
    switch (movementTypeId) {
      case "entrada":
        return "Entrada";
      case "salida":
        return "Salida";
      case "recolocacion":
        return "Recolocacion";
      default:
        return "Entrada";
    }
  }, [movementTypeId]);

  return (
    <Form
      form={form}
      name="InventoryMovementForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Folio"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <Input placeholder="Generado al procesar..." disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="OT Relacionada"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la OT relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Fecha"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <DatePicker className="w-full" placeholder="Fecha" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Concepto de movimiento"
            rules={defaultRequiredRules(isDraft)}
            name="movementConcept">
            <Select
              onChange={handleMovementTypeChange}
              defaultValue={"merchandise-acquisition"}>
              <Select.Option key={"merchandise-acquisition"}>
                Adquisición de Mercancía
              </Select.Option>
              <Select.Option key={"production-output"}>
                Salida a producción
              </Select.Option>
              <Select.Option key={"sale"}>Venta</Select.Option>
              <Select.Option key={"merchandise-return"}>
                Devolución de mercancía
              </Select.Option>
              <Select.Option key={"production-reception"}>
                Recepción de producción
              </Select.Option>
              <Select.Option key={"external-sample-delivery"}>
                Entrega de Muestra a externo
              </Select.Option>
              <Select.Option key={"human-donation"}>
                Donación humana
              </Select.Option>
              <Select.Option key={"waste"}>Desecho</Select.Option>
              <Select.Option key={"forage-livestock"}>
                Forrajero / Ganadero
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tipo de movimiento">
            <Select
              disabled={true}
              onChange={handleMovementTypeChange}
              defaultValue={"entry-authorization"}>
              <Select.Option key={"entry-authorization"}>
                Autorización de Entrada
              </Select.Option>
              <Select.Option key={"exit-voucher"}>Vale de salida</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Almacen de salida"
            name="fromId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona un almacen"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Almacen de entrada"
            name="toId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona un almacen"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="OC Relacionada"
            name="ocId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la OC relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Requisición Relacionada"
            name="requisitionId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => WarehousesAPI.getWarehouses()}
              placeholder="Selecciona la requisición relacionada"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["warehouses"]}
            />
          </Form.Item>
        </Col>
      </Row>
      <div className="text-lg">
        <strong>Resumen:</strong> <br />
        Se hace un movimiento de tipo{" "}
        <i>
          <strong>{movementType} </strong>
        </i>
        Desde el almacen de salida{" "}
        <i>
          <strong>{exitWarehouse} </strong>
        </i>{" "}
        Hacia el almacen de entrada{" "}
        <i>
          <strong>{entryWarehouse} </strong>
        </i>
      </div>
      <div className="mt-5">
        <Form.Item
          name="understood"
          label="Esta de acuerdo con esa frase?"
          valuePropName="checked"
          rules={defaultRequiredRules(isDraft)}>
          <Checkbox className="ml-3" />
        </Form.Item>
        <div>Debe aceptar para continuar</div>
      </div>
      {validatedUnderstood && (
        <>
          <Row gutter={16} className="mt-5">
            <Col span={24}>
              <hr />
            </Col>
            <Col span={24}>
              <Typography.Title level={3}>Seccion de lotes</Typography.Title>
            </Col>
          </Row>

          <FormList
            ref={formListRef}
            renderForm={(ref: Ref<BatchFormHandle>) => <BatchForm ref={ref} />}
            getFormData={(formHandle: BatchFormHandle) =>
              formHandle.getFormData()
            }
          />
        </>
      )}
    </Form>
  );
});

export default InventoryMovementForm;
