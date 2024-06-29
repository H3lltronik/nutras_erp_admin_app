import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { jsonToUrlWithGetKey } from "../lib/entity.utils";
import NotFound from "../pages/Errors/NotFound";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import { InventoryManage } from "../pages/Inventory/Manage/InventoryManage";
import { InventoriesList } from "../pages/Inventory/List/InventoryList";
import Login from "../pages/Login/Login";
import { MeasurementsHeader } from "../pages/MeasurementTypes/MeasurementsHeader";
import { MeasurementsList } from "../pages/MeasurementTypes/MeasurementsList";
import { MeasurementsManage } from "../pages/MeasurementTypes/MeasurementsManage";
import { MovementsList, MovementsManage } from "../pages/Movements";
import { MovementsHeader } from "../pages/Movements/Common/MovementsHeader";
import { ProductsHeader } from "../pages/Products/Common/ProductsHeader";
import { ProductsList } from "../pages/Products/List/ProductsList";
import { ProductsManage } from "../pages/Products/Manage/ProductsManage";
import { ProfilesList, ProfilesManage } from "../pages/Profiles";
import { ProfilesHeader } from "../pages/Profiles/Common/ProfilesHeader";
import { ProvidersList, ProvidersManage } from "../pages/Providers";
import { ProvidersHeader } from "../pages/Providers/Common/ProvidersHeader";
import { PurchaseRequisitionHeader } from "../pages/PurchaseRequisitions/Common/PurchaseRequisitionHeader";
import { PurchaseRequisitionList } from "../pages/PurchaseRequisitions/List/PurchaseRequisitionList";
import { PurchaseRequisitionManage } from "../pages/PurchaseRequisitions/Manage/PurchaseRequisitionManage";
import { UsersManage } from "../pages/Users";
import { UsersHeader } from "../pages/Users/Common/UsersHeader";
import { UsersList } from "../pages/Users/List/UsersList";
import { WorkOrdersList, WorkOrdersManage } from "../pages/WorkOrders";
import { WorkOrdersHeader } from "../pages/WorkOrders/Common/WorkOrderHeader";
import { WorkRequestsList, WorkRequestsManage } from "../pages/WorkRequests";
import { WorkRequestsHeader } from "../pages/WorkRequests/Common/WorkRequestHeader";
import { PurchaseOrdersList, PurchaseOrdersManage } from "../pages/PurchaseOrders";
import { PurchaseOrdersHeader } from "../pages/PurchaseOrders/Common/PurchaseOrdersHeader";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { routesList } from "./routes";
import { InventoryHeader } from "../pages/Inventory/Common/InventorHeader";

const router = createBrowserRouter([
  {
    path: routesList.login.path,
    element: <Login />,
  },
  {
    path: routesList.admin.path,
    element: (
      <ProtectedRoute
        element={
          <DefaultLayout navContent={<HomeHeader />} headerTitle="Inicio">
            <Home />
          </DefaultLayout>
        }
      />
    ),
  },
  {
    path: "/admin/users",
    element: (
      <DefaultLayout navContent={<UsersHeader />} headerTitle="Usuarios">
        <UsersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/users/manage/:id?",
    element: (
      <DefaultLayout navContent={<UsersHeader />} headerTitle="Usuarios">
        <UsersManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/measurement-types",
    element: (
      <DefaultLayout
        navContent={<MeasurementsHeader />}
        headerTitle="Unidades de medida">
        <MeasurementsList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/measurement-types/manage",
    element: (
      <DefaultLayout
        navContent={<MeasurementsHeader />}
        headerTitle="Unidades de medida">
        <MeasurementsManage />
      </DefaultLayout>
    ),
  },
  // ********************************************************
  // ***************** PRODUCTOS ****************************
  // ********************************************************
  {
    path: "/admin/products",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsList
          productsRoute="products"
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/inspect/product/:id?",
    element: (
      <DefaultLayout
        navContent={<ProductsHeader />}
        headerTitle={`Inspeccion de producto`}>
        <ProductsManage
          formMode="view"
          formType="produccion"
          listPath="/admin/products/pp"
          hiddenFields={{
            providerDescription: true,
            isActive: true,
          }}
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/manage/pp/:id?",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsManage
          formType="produccion"
          listPath="/admin/products/pp"
          formTitle="Catálogo de PP"
          hiddenFields={{
            isKosher: true,
            isActive: true,
          }}
          requiredFields={{
            productTypeId: true,
            code: true,
            commonName: true,
            unitId: true,
            productTypeCategoryId: true,
            providerId: true,
            quantityPerUnit: true,
          }}
          />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/manage/pt/:id?",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsManage
          formType="produccion"
          listPath="/admin/products/pt"
          formTitle="Catálogo de PT"
          hiddenFields={{
            isActive: true,
          }}
          requiredFields={{
            productTypeId: true,
            code: true,
            commonName: true,
            unitId: true,
            productTypeCategoryId: true,
            providerId: true,
            quantityPerUnit: true,
          }}
          />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/pp",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsList
          mode="full"
          productFormType="PP"
          columnsToHide={[
            'partidaId',
            'type',
            'provider',
            'isKosher',
            'allergen'
          ]}
          disabledFilters={{
            kosher: true,
            allergen: true,
            provider: true,
            productTypes: true,
          }}
          buildNewProductPath={({ id }) =>
            jsonToUrlWithGetKey(
              `/admin/products/manage/pp/${id}`,
              {
                productTypeId: import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID,
              },
              "defaultValues"
            )
          }
          defaultFilters={{
            type: import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PP_ID,
          }}
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/pt",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsList
          mode="full"
          productFormType="PT"
          columnsToHide={[
            'partidaId',
            'type',
            'provider',
            'allergen'
          ]}
          buildNewProductPath={({ id }) =>
            jsonToUrlWithGetKey(
              `/admin/products/manage/pt/${id}`,
              {
                productTypeId: import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PT_ID,
              },
              "defaultValues"
            )
          }
          defaultFilters={{
            type: import.meta.env.VITE_DBVAL_PRODUCT_TYPE_PT_ID,
          }}
          disabledFilters={{
            allergen: true,
            provider: true,
            productTypes: true,
            productTypesCategories: true,
          }}
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/insumos",
    element: (
      <DefaultLayout
        navContent={<ProductsHeader />}
        headerTitle="Productos (INSUMOS)">
        <ProductsList
          mode="full"
          buildNewProductPath={({ id }) =>
            "/admin/products/insumos/manage/" + id
          }
          defaultFilters={{
            department: import.meta.env.VITE_DBVAL_DEPARTMENT_COMPRAS_ID,
          }}
          disabledFilters={{
            presentations: true,
            productTypesCategories: true,
          }}
          productsRoute="insumo"
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/inspect/insumo/:id?",
    element: (
      <DefaultLayout
        navContent={<ProductsHeader />}
        headerTitle={`Inspeccion de producto`}>
        <ProductsManage
          formMode="view"
          formType="compras"
          listPath="/admin/products/pp"
          hiddenFields={{
            mold: true,
            packaging: true,
          }}
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/insumos/manage/:id?",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos (INSUMOS)">
        <ProductsManage
          listPath="/admin/products/insumos"
          formType="compras"
          hiddenFields={{
            mold: true,
            packaging: true,
          }}
          requiredFields={{
            productTypeId: true,
            commonName: true,
            code: true,
            unitId: true,
            providerId: true,
            quantityPerUnit: true,
          }}
          />
      </DefaultLayout>
    ),
  },
  // ********************************************************
  // ***************** PROVEEDORES **************************
  // ********************************************************
  {
    path: "/admin/providers",
    element: (
      <DefaultLayout navContent={<ProvidersHeader />} headerTitle="Proveedores">
        <ProvidersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/providers/manage/:id?",
    element: (
      <DefaultLayout navContent={<ProvidersHeader />} headerTitle="Proveedores">
        <ProvidersManage
          enableRedirect={true}
          hiddenFields={{}}
          requiredFields={{
            code: true,
            name: true,
            service: true,
          }}
          />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/providers/inspect/provider/:id?",
    element: (
      <DefaultLayout
        navContent={<ProvidersHeader />}
        headerTitle={`Inspeccion de proveedor`}>
        <ProvidersManage
          formMode="view"
          formType="produccion"
          listPath="/admin/products/pp"
        />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/profiles",
    element: (
      <DefaultLayout navContent={<ProfilesHeader />} headerTitle="Perfiles">
        <ProfilesList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/profiles/manage/:id?",
    element: (
      <DefaultLayout navContent={<ProfilesHeader />} headerTitle="Perfiles">
        <ProfilesManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/providers",
    element: (
      <DefaultLayout navContent={<ProvidersHeader />} headerTitle="Proveedores">
        <ProvidersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/purchase-requisition",
    element: (
      <DefaultLayout
        navContent={<PurchaseRequisitionHeader />}
        headerTitle="Requsuciones de compra">
        <PurchaseRequisitionList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/purchase-requisition/manage/:id?",
    element: (
      <DefaultLayout
        navContent={<PurchaseRequisitionHeader />}
        headerTitle="Requsiciones de compra">
        <PurchaseRequisitionManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/work-orders",
    element: (
      <DefaultLayout navContent={<WorkOrdersHeader />} headerTitle="Productos">
        <WorkOrdersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/work-orders/manage/:id?",
    element: (
      <DefaultLayout navContent={<WorkOrdersHeader />} headerTitle="Productos">
        <WorkOrdersManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/movements",
    element: (
      <DefaultLayout navContent={<MovementsHeader />} headerTitle="Movimientos">
        <MovementsList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/movements/manage/:id?",
    element: (
      <DefaultLayout navContent={<MovementsHeader />} headerTitle="Movimientos">
        <MovementsManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/inventory",
    element: (
      <DefaultLayout navContent={<InventoryHeader />} headerTitle="Inventario">
        <InventoriesList />
      </DefaultLayout>
    ),
  },
  // ************************* Compras ************************* //
  {
    path: "/admin/purchase-orders",
    element: (
      <DefaultLayout
        navContent={<PurchaseOrdersHeader />}
        headerTitle="Productos">
        <PurchaseOrdersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/purchase-orders/manage/:id?",
    element: (
      <DefaultLayout
        navContent={<PurchaseOrdersHeader />}
        headerTitle="Productos">
        <PurchaseOrdersManage />
      </DefaultLayout>
    ),
  },
  {
    path: "*",
    element: (
      <DefaultLayout headerTitle="El recurso no se encontro...">
        <NotFound />
      </DefaultLayout>
    ),
  },
  // ***************** Direccion ***************** //
  {
    path: "/admin/work-requests",
    element: (
      <DefaultLayout
        navContent={<WorkRequestsHeader />}
        headerTitle="Productos">
        <WorkRequestsList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/work-requests/manage/:id?",
    element: (
      <DefaultLayout
        navContent={<WorkRequestsHeader />}
        headerTitle="Productos">
        <WorkRequestsManage />
      </DefaultLayout>
    ),
  },
]);

export default router;
