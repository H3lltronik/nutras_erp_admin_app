import { Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { UserAPI, WorkOrderAPI } from "../../../api";
import {
  PurchaseRequisition,
  PurchaseRequisitionFormItem,
  PurchaseRequisitionProductFormItem,
} from "../../../api/purchaseRequisition/types";
import { defaultRequiredRules } from "../../../lib/common/forms";
import { FormList, FormListHandle } from "../Common/FormList";
import { GenericSelect } from "../Common/GenericSelect";
import PurchaseRequisitionProductForm, {
  PurchaseRequisitionProductFormHandle,
} from "./PurchaseRequisitionProductForm";

const onFinish = (values: unknown) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

interface GetFormData {
  draftMode: boolean;
}

export type PurchaseRequisitionFormHandle = {
  getFormData: (params?: GetFormData) => Promise<PurchaseRequisitionFormItem>;
};

type PurchaseRequisitionFormProps = {
  entity?: PurchaseRequisition | null;
};

const PurchaseRequisitionForm = forwardRef<
  PurchaseRequisitionFormHandle,
  PurchaseRequisitionFormProps
>((_props, ref) => {
  const [form] = Form.useForm<PurchaseRequisitionFormItem>();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const formListRef =
    useRef<FormListHandle<PurchaseRequisitionProductFormItem>>(null);

  useImperativeHandle(
    ref,
    (): PurchaseRequisitionFormHandle => ({
      getFormData: async (params?: GetFormData) => {
        setIsDraft(!!params?.draftMode);

        const formsData = await formListRef.current?.getAllFormsData();
        await form.validateFields();

        const formData = form.getFieldsValue();
        return {
          ...formData,
          isDraft: !!params?.draftMode,
          isPublished: !params?.draftMode,
          purchase_requisition_products: formsData,
        };
      },
    })
  );

  useEffect(() => {
    if (_props.entity) form.setFieldsValue(_props.entity);
  }, [form, _props.entity]);

  return (
    <Form
      form={form}
      name="PurchaseRequisitionForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<PurchaseRequisition> name="id" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<PurchaseRequisition>
            label="Usuario"
            name="userId"
            rules={defaultRequiredRules(isDraft)}>
            <GenericSelect
              fetcher={() => UserAPI.getUsers()}
              placeholder="Selecciona un usuario"
              optionLabel="name"
              optionKey={"id"}
              queryKey={["users"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<PurchaseRequisition>
            label="Orden de trabajo"
            name="workOrderId"
            // rules={defaultRequiredRules(isDraft)}
            >
            <GenericSelect
              fetcher={() => WorkOrderAPI.getWorkOrders()}
              placeholder="Selecciona orden de trabajo"
              optionLabel="folio"
              optionKey={"id"}
              queryKey={["workOrders"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<PurchaseRequisition>
            label="Motivo"
            name="motive"
            rules={defaultRequiredRules(isDraft)}>
            <TextArea />
          </Form.Item>
        </Col>
        {/* <Col span={24}>
          <FormList
            title="Agregar productos"
            ref={formListRef}
            renderForm={(ref: Ref<PurchaseRequisitionProductFormHandle>) => (
              <PurchaseRequisitionProductForm ref={ref} />
            )}
            getFormData={(formHandle: PurchaseRequisitionProductFormHandle) =>
              formHandle.getFormData()
            }
          />
        </Col> */}
      </Row>
    </Form>
  );
});

export default PurchaseRequisitionForm;
