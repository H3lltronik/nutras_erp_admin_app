import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { ProductsList } from "../../../pages/Products";
import { MovementConceptAPI, MovementTypeAPI } from "../../../api";
import moment from "moment-timezone";

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
  const [date, setDate] = useState<moment.Moment>(moment());

  const showOcSelector = (movementConceptId: string): boolean => {
    const movementConcept = movementConcepts.find((concept) => concept.id === movementConceptId);
    return movementConcept?.name?.toLowerCase() == "Adquisición de mercancía".toLowerCase();
  }

  const showRequisitionRelatedOcSelector = (movementConceptId: string): boolean => {
    const movementConcept = movementConcepts.find((concept) => concept.id === movementConceptId);
    return movementConcept?.name?.toLowerCase() == "Recepción de producción".toLowerCase();
  }

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
        setMovementConcepts(movementsConcept.data);
      } catch (error) {
        console.error("Error getting MovementConcepts");
      }
    }

    const getMovementsType = async () => {
      try {
        const movementsType = await MovementTypeAPI.getAll();
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
      initialValues={{ remember: true, userId: useAuth().user?.id, date: date.format('YYYY-MM-DD') }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Fecha" name="date">
            <Input disabled type="date"></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Folio" name="folio">
            <Input disabled type="text"></Input>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Concepto de movimiento" name="movementConceptId">
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

      {
        showOcSelector(form.getFieldValue('movementConceptId')) ?
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Orden de compra relacionada" name="ocId" shouldUpdate>
                <Select>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        :
        showRequisitionRelatedOcSelector(form.getFieldValue('movementConceptId')) ?
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Requisición relacionada" name="requisitionId" shouldUpdate>
              <Select>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        : null
      }

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Origen" name="movementOrigin" shouldUpdate>
            <Input readOnly />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Destino" name="movementDestination" shouldUpdate>
            <Input readOnly />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default MovementForm;
