import { Form, Input } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { defaultRequiredRules } from "../../../lib/common/forms";
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

export type WorkRequestFormHandle = {
  getFormData: (params?: GetFormData) => Promise<WorkRequest>;
};

type WorkRequestFormProps = {
  entity?: WorkRequest | null;
};

const WorkRequestForm = forwardRef<WorkRequestFormHandle, WorkRequestFormProps>(
  (_props, ref) => {
    const [form] = Form.useForm();
    const [isDraft, setIsDraft] = useState<boolean>(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(
      null
    );

    useImperativeHandle(
      ref,
      (): WorkRequestFormHandle => ({
        getFormData: async (params) => {
          setIsDraft(!!params?.draftMode);

          const valid = await form.validateFields();
          const formData = form.getFieldsValue();

          const products = Object.keys(formData)
            .filter((key) => key.startsWith("products."))
            .map((key) => ({
              id: key.replace("products.", ""),
              quantity: formData[key],
            }));

          // Remove the product fields from formData
          Object.keys(formData)
            .filter((key) => key.startsWith("products."))
            .forEach((key) => {
              delete formData[key];
            });

          const data = {
            ...formData,
            userId: params?.user?.id,
            products,
            user: params?.user,
            isDraft: !!params?.draftMode,
            isPublished: !params?.draftMode,
          };

          return data;
        },
      })
    );

    useEffect(() => {
      if (_props.entity) {
        const entity = {
          ..._props.entity,
        };

        for (const product of entity.products) {
          entity[`products.${product.productId}`] = product.quantity;
        }

        form.setFieldsValue(entity);
      }

      if (_props.entity?.products) {
        const products = _props.entity.products.map((product) => ({
          id: product.productId,
          quantity: product.quantity,
          commonName: product.product.commonName,
        }));
        setSelectedProducts(products);
      }
    }, [form, _props.entity]);

    const onSelectionChange = (selectedRows: Product[]) => {
      setSelectedProducts(selectedRows);
    };

    return (
      <Form
        form={form}
        name="WorkRequestForm"
        initialValues={{ remember: true, userId: useAuth().user?.id }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<WorkRequest> name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>

        <Form.Item<WorkRequest>
          label="Folio"
          name="folio"
          rules={defaultRequiredRules(isDraft)}>
          <Input />
        </Form.Item>

        <Form.Item<WorkRequest>
          label="Nombre de cliente"
          name="clientName"
          rules={defaultRequiredRules(isDraft)}>
          <Input />
        </Form.Item>

        <ProductsList
          mode="selection-only"
          enableSelection={true}
          selectionLimit={100}
          onSelectionChange={onSelectionChange}
          selectedRowIds={selectedProducts?.map((product) => product.id)}
          defaultFilters={{
            published: true,
          }}
          disabledFilters={{
            status: true,
          }}
        />

        {/* dynamic list that renders the products and a form input number to select a quantity for each product */}
        <div className="flex gap-5 flex-wrap">
          {selectedProducts?.map((product, index) => (
            <Form.Item<any>
              label={`Cantidad para producto <${product.commonName}>`}
              name={`products.${product.id}`}
              rules={defaultRequiredRules(isDraft)}>
              <Input type="number" />
            </Form.Item>
          ))}
        </div>

        <Form.Item<WorkRequest>
          label="Nota"
          name="note"
          rules={defaultRequiredRules(isDraft)}>
          <Input.TextArea />
        </Form.Item>

        {/* Add other form controls like Submit button, etc. if needed */}
      </Form>
    );
  }
);

export default WorkRequestForm;
