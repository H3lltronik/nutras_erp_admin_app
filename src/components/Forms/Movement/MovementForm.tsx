import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";

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

export type MovementFormHandle = {
  getFormData: (params?: GetFormData) => Promise<Movement>;
};

type MovementFormProps = {
  entity?: Movement | null;
  disableProductSelection?: boolean;
};

const MovementForm = forwardRef<MovementFormHandle, MovementFormProps>((_props, ref) => {
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useImperativeHandle(
    ref,
    (): MovementFormHandle => ({
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

  const onSelectionChange = (selectedRows: Product[]) => {
    if (selectedRows.length > 0) setSelectedProduct(selectedRows[0]);
  };

  const handleOCSelection = () => {
    // Open modal to select OC
    // Update selectedOC based on modal selection
  };

  // Function to handle Requisition selection
  const handleRequisitionSelection = () => {
    // Open modal to select Requisition
    // Update selectedRequisition based on modal selection
  };

  return (
    <Form
      name="MovementForm"
      initialValues={{ remember: true, userId: useAuth().user?.id }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* ... Existing ProductList code ... */}

      {/* New Fields */}
      <Form.Item label="Concepto de movimiento" name="concept">
        <Select>
          <Select.Option value="adquisicion">Adquisición de Mercancía</Select.Option>
          <Select.Option value="salidaProduccion">Salida a producción</Select.Option>
          <Select.Option value="venta">Venta</Select.Option>
          <Select.Option value="Vale de salida" >Salida a producción</Select.Option>
          <Select.Option value="Autorización de Salida" >Venta</Select.Option>
          <Select.Option value="Autorización de Entrada" >Devolución de mercancía</Select.Option>
          <Select.Option value="Vale de entrada" >Recepción de producción</Select.Option>
          <Select.Option value="Autorización de salida" >Entrega de Muestra a externo</Select.Option>
          <Select.Option value="Autorización de Salida" >Donación humana</Select.Option>
          <Select.Option value="Autorización de Salida" >Desecho</Select.Option>
          <Select.Option value="Autorización de Salida" >Forrajero / Ganadero</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Tipo de movimiento" name="movementType" shouldUpdate>
        <Input readOnly />
      </Form.Item>

      <Form.Item label="OC Relacionada" name="relatedOC" shouldUpdate>
        <Select
          disabled={form.getFieldValue("concept") === "adquisicion"}
          onClick={handleOCSelection}
        >
          {/* ... Options based on OCs ... */}
        </Select>
      </Form.Item>

      <Form.Item label="Requisición Relacionada" name="relatedRequisition" shouldUpdate>
        <Select
          disabled={form.getFieldValue("concept") === "envioProduccion"}
          onClick={handleRequisitionSelection}
        >
          {/* ... Options based on Requisitions ... */}
        </Select>
      </Form.Item>

      <Form.Item label="Origen" name="movementOrigin" shouldUpdate>
        <Input readOnly />
      </Form.Item>

      <Form.Item label="Destino" name="movementDestination" shouldUpdate>
        <Input readOnly />
      </Form.Item>
    </Form>
  );
});

export default MovementForm;
