import { Breadcrumb, Layout, Typography, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useEffect, useRef } from "react";
import { ProductAPI } from "../../api";
import ProductForm, { ProductFormHandle } from "../../components/Forms/Product/ProductForm";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

export const Products: React.FC = () => {
  const productFormRef = useRef<ProductFormHandle | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      const res = await ProductAPI.getProducts();
      console.log(res);
    })();
  }, []);

  const submitForm = async () => {
    const ProductFormData = await productFormRef.current?.getFormData();
    console.log("ProductFormData", ProductFormData);
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
