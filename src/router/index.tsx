import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import NotFound from "../pages/Errors/NotFound";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import Login from "../pages/Login/Login";
import { MeasurementsHeader } from "../pages/MeasurementTypes/MeasurementsHeader";
import { MeasurementsList } from "../pages/MeasurementTypes/MeasurementsList";
import { MeasurementsManage } from "../pages/MeasurementTypes/MeasurementsManage";
import { ProductsHeader } from "../pages/Products/Common/ProductsHeader";
import { ProductsList } from "../pages/Products/List/ProductsList";
import { ProductsManage } from "../pages/Products/Manage/ProductsManage";
import { PurchaseOrdersHeader } from "../pages/PurchaseOrders/Common/PurchasesOrderHeader";
import { PurchaseOrdersList } from "../pages/PurchaseOrders/List/PurchaseOrdersList";
import { PurchaseOrdersManage } from "../pages/PurchaseOrders/Manage/PurchaseOrdersManage";
import { ProfilesList, ProfilesManage } from "../pages/Profiles";
import { ProfilesHeader } from "../pages/Profiles/Common/ProfilesHeader";
import { UsersManage } from "../pages/Users";
import { UsersList } from "../pages/Users/List/UsersList";
import { UsersHeader } from "../pages/Users/Common/UsersHeader";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { routesList } from "./routes";
import { WorkRequestsHeader } from "../pages/WorkRequests/Common/WorkRequestHeader";
import { WorkRequestsList, WorkRequestsManage } from "../pages/WorkRequests";

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
  {
    path: "/admin/products",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products/manage/:id?",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <ProductsManage />
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
    path: "/admin/purchase-orders",
    element: (
      <DefaultLayout navContent={<PurchaseOrdersHeader />} headerTitle="Productos">
        <PurchaseOrdersList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/purchase-orders/manage/:id?",
    element: (
      <DefaultLayout navContent={<PurchaseOrdersHeader />} headerTitle="Productos">
        <PurchaseOrdersManage />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/work-requests",
    element: (
      <DefaultLayout navContent={<WorkRequestsHeader />} headerTitle="Productos">
        <WorkRequestsList />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/work-requests/manage/:id?",
    element: (
      <DefaultLayout navContent={<WorkRequestsHeader />} headerTitle="Productos">
        <WorkRequestsManage />
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
]);

export default router;
