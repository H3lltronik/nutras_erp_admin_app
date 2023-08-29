import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductAPI } from "../../api";
import { AppLoader } from "../../components/Common/AppLoader";
import ProductForm, {
  ProductFormHandle,
} from "../../components/Forms/Product/ProductForm";
import useAdminMutation from "../../hooks/useAdminAPI/useAdminMutation";
import { showToast } from "../../lib/notify";
import { ProductsManageBreadcrumb } from "./Breadcrums";

const { Content } = Layout;

export const ProductsManage: React.FC = () => {
  const productFormRef = useRef<ProductFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useAdminMutation("createProduct");
  const navigate = useNavigate();
  const { id } = useParams();

  const entity = useQuery<GetProductResponse | APIError>(
    ["product", { id }],
    () => ProductAPI.getProduct(id as string),
    { enabled: !!id }
  );

  const submitForm = async () => {
    const productFormData =
      (await productFormRef.current?.getFormData()) as CreateProductRequest;

    setPageLoading(true);
    try {
      let result = null;
      let message = "";

      if (entity?.data) {
        if ("id" in entity.data) {
          result = await ProductAPI.updateProduct(
            entity.data.id,
            productFormData
          );
          message = "Producto actualizado correctamente";
        } else {
          alert("No se puede actualizar el producto");
          console.error("Not valid entity", entity.data);
        }
      } else {
        result = await mutateAsync(productFormData);
        message = "Producto creado correctamente";
      }

      if (result) {
        if ("id" in result) {
          showToast(message, "success");
          navigate("/admin/products");
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const entityData = useMemo(() => {
    if (entity.isLoading || !entity.data) return null;
    if ("id" in entity.data) return entity.data;

    return null;
  }, [entity]);

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <ProductsManageBreadcrumb />

        <div
          className=""
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
          }}>
          <section className="max-w-[1500px]">
            <ProductForm ref={productFormRef} entity={entityData} />

            <button
              className="bg-gray-500 py-1 px-2 rounded-lg text-white"
              onClick={submitForm}>
              Submit form
            </button>
          </section>
        </div>

        <AppLoader isLoading={pageLoading} />
      </Content>
    </>
  );
};
