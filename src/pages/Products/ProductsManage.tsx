import { Breadcrumb, Layout, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm, {
  ProductFormHandle,
} from "../../components/Forms/Product/ProductForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";

const { Content } = Layout;

export const ProductsManage: React.FC = () => {
  const productFormRef = useRef<ProductFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createProduct");
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const submitForm = async () => {
    const productFormData =
      (await productFormRef.current?.getFormData()) as CreateProductRequest;

    setPageLoading(true);
    const result = await mutateAsync(productFormData);

    if (result.code) {
      showToast("Producto creado correctamente", "success");
      navigate("/admin/products");
    }

    setPageLoading(false);
  };

  const breadcrumb: ItemType[] = [
    {
      title: "Administración",
    },
    {
      title: "Productos",
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />
        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
          }}>
          <section className="max-w-[1500px]">
            <ProductForm ref={productFormRef} />

            <button
              className="bg-gray-500 py-1 px-2 rounded-lg text-white"
              onClick={submitForm}>
              Submit form
            </button>
          </section>
        </div>
      </Content>
    </>
  );
};
