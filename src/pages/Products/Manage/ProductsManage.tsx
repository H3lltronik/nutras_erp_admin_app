import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout } from "antd";
import React, { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductAPI } from "../../../api";
import { AppLoader } from "../../../components/Common/AppLoader";
import ProductFormCompras, {
  ProductFormHandle,
} from "../../../components/Forms/Product/ProductFormCompras";
import ProductFormProduccion from "../../../components/Forms/Product/ProductFormProduccion";
import { roles } from "../../../components/Forms/Profiles/roles";
import { useAbilities } from "../../../hooks/roles/useAbilities";
import useAuth from "../../../hooks/useAuth";
import { cancelModal, showToast } from "../../../lib/notify";
import { ProductsManageBreadcrumb } from "../Common/Breadcrums";
import { PPManageBreadcrumb } from "../Common/PPBreadcrums";
import { PTManageBreadcrumb } from "../Common/PTBreadcrums";
import {
  ProductFormResult,
  ProductToPost,
  formatProductForm,
  unformatProductForm,
} from "../lib/formatProductForm";

const { Content } = Layout;

type ProductsManageProps = {
  formType: "compras" | "produccion" | "admin";
  listPath: string;
  formMode?: FormMode;
  formTitle?: string;
  hiddenFields?: {
    [K in keyof Product]?: boolean;
  };
  requiredFields?: {
    [K in keyof Product]?: boolean;
  };
};

export const ProductsManage: React.FC<ProductsManageProps> = (props) => {
  const productFormRef = useRef<ProductFormHandle | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const { mutateAsync } = useMutation({
    mutationFn: (data: ProductToPost) =>
      ProductAPI.createProduct<ProductToPost>(data),
    onSuccess: () => {
      showToast("Producto creado correctamente", "success");
    },
    onError: (error) => {
      showToast("Error al crear el producto", "error");
      console.error("error", error);
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const ability = useAbilities(user?.profile.roles || []);

  const {
    data: entity,
    isFetching,
    isLoading,
  } = useQuery<GetProductResponse | APIError>({
    queryKey: ["product", { id }],
    queryFn: () => ProductAPI.getProduct(id as string),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const loading = useMemo(
    () => pageLoading || isFetching || (isLoading && !!id),
    [isLoading, pageLoading, isFetching, id]
  );

  const submitForm = async (isDraft = false) => {
    const productFormData = (await productFormRef.current?.getFormData({
      draftMode: isDraft,
    })) as ProductFormResult;
    const parsedFormData = formatProductForm(productFormData);
    parsedFormData.profileId = user?.profile.id as string;

    setPageLoading(true);
    try {
      let result = null;

      if (entity) {
        if ("id" in entity) {
          result = await ProductAPI.updateProduct(entity.id, parsedFormData);
        } else {
          alert("No se puede actualizar el producto");
          console.error("Not valid entity", entity);
        }
      } else {
        console.log("parsedFormData", parsedFormData);
        result = await mutateAsync(parsedFormData);
      }

      if (result) {
        if ("id" in result) {
          navigate(props.listPath);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

    setPageLoading(false);
  };

  const doCancel = async () => {
    cancelModal({
      onOk: () => navigate(props.listPath),
    });
  };

  const entityData = useMemo(() => {
    if (!entity) return null;
    if ("id" in entity) return unformatProductForm(entity);

    return null;
  }, [entity]);

  return (
    <>
      <Content className="relative mx-4">
        {props.formType == "produccion" ? (
          <PPManageBreadcrumb />
        ) : props.formType == "compras" ? (
          <PTManageBreadcrumb />
        ) : (
          <ProductsManageBreadcrumb />
        )}
        {entity?.deletedAt && (
          <div className="w-full py-1 bg-red-500 text-center text-white">
            Cancelado
          </div>
        )}
        <div className="p-[24px] bg-white">
          <section className="max-w-[1500px]">
            {props.formType === "compras" &&
            ability.can(
              roles.Product.roles.comprasForm.action,
              roles.Product.entity
            ) ? (
              <>
                <h2 className="text-2xl">Catálogo de insumos</h2>
                <hr className="mt-2 mb-5" />
                <ProductFormCompras
                  formMode={props.formMode}
                  ref={productFormRef}
                  hiddenFields={props.hiddenFields}
                  requiredFields={props.requiredFields}
                  entity={entityData}
                />
              </>
            ) : props.formType === "produccion" &&
              ability.can(
                roles.Product.roles.produccionForm.action,
                roles.Product.entity
              ) ? (
              <>
                <h2 className="text-2xl">
                  {props.formTitle ?? "Catálogo de productos"}
                </h2>
                <hr className="mt-2 mb-5" />
                <ProductFormProduccion
                  formMode={props.formMode}
                  ref={productFormRef}
                  hiddenFields={props.hiddenFields}
                  requiredFields={props.requiredFields}
                  entity={entityData}
                />
              </>
            ) : (
              <>Not valid</>
            )}

            {props.formMode === "view" ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                  Regresar
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => submitForm(false)}
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline">
                  Procesar
                </button>
                {!entityData?.isPublished && (
                  <button
                    type="button"
                    onClick={() => submitForm(true)}
                    className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                    Borrador
                  </button>
                )}
                <button
                  type="button"
                  onClick={doCancel}
                  className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
                  Cancelar
                </button>
              </>
            )}
          </section>
        </div>
        <AppLoader isLoading={loading} />
      </Content>
    </>
  );
};
