import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";
import { MovementConceptAPI, MovementTypeAPI } from "../../../api";

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
  const [movementConcepts, setMovementConcepts] = useState<GetMovementConceptsResponseData[]>([]);
  const [movementTypes, setMovementTypes] = useState<GetMovementTypesResponseData[]>([]);

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

    const getMovementsConcept = async () => {
      try {
        const movementsConcept = await MovementConceptAPI.getAll();
        console.log("movement concepts", movementsConcept);
        setMovementConcepts(movementsConcept.data);
      } catch (error) {
        console.error("Error getting MovementConcepts");
      }
    }

    const getMovementsType = async () => {
      try {
        const movementsType = await MovementTypeAPI.getAll();
        console.log( movementsType);
        setMovementTypes(movementsType.data);
      } catch (error) {
        console.error("Error getting MovementTypes");
      }
    }

    getMovementsConcept();
    getMovementsType();
  }, [form, _props.entity]);

  const onMovementConceptSelected = (value: string) => {
    const moevemtnConcept = movementConcepts.find((concept) => concept.id === value);
    const movementType = movementTypes.find((type) => type.id === moevemtnConcept?.movementTypeId);
    console.log("movementType", movementType);
    form.setFieldsValue({ movementType: movementType?.name });
  }

  return (
    <Form
      form={form}
      name="MovementForm"
      initialValues={{ remember: true, userId: useAuth().user?.id }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Concepto de movimiento" name="concept">
            <Select onChange={onMovementConceptSelected}>
              {
                movementConcepts.map((concept) => {
                  return <Select.Option key={concept.id} value={concept.id}>{concept.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tipo de movimiento" name="movementType" shouldUpdate>
            <Input disabled></Input>
          </Form.Item>
        </Col>
      </Row>


      <Form.Item label="OC Relacionada" name="relatedOC" shouldUpdate>
        <Select
          disabled={form.getFieldValue("concept") === "adquisicion"}
        >
          {/* ... Options based on OCs ... */}
        </Select>
      </Form.Item>

      <Form.Item label="Requisición Relacionada" name="relatedRequisition" shouldUpdate>
        <Select
          disabled={form.getFieldValue("concept") === "envioProduccion"}
        >
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
