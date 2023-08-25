import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import Login from "../pages/Login/Login";
import { MeasurementsHeader } from "../pages/MeasurementTypes/MeasurementsHeader";
import { MeasurementsList } from "../pages/MeasurementTypes/MeasurementsList";
import { MeasurementsManage } from "../pages/MeasurementTypes/MeasurementsManage";
import { ProductsHeader } from "../pages/Products/ProductsHeader";
import { ProductsList } from "../pages/Products/ProductsList";
import { ProductsManage } from "../pages/Products/ProductsManage";
import { ProfilesList, ProfilesManage } from "../pages/Profiles";
import { ProfilesHeader } from "../pages/Profiles/ProfilesHeader";
import { UsersManage } from "../pages/Users";
import { UsersHeader } from "../pages/Users/UsersHeader";
import { UsersList } from "../pages/Users/UsersList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { routesList } from "./routes";

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
    path: "/admin/products/manage",
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
    path: "/admin/profiles/manage",
    element: (
      <DefaultLayout navContent={<ProfilesHeader />} headerTitle="Perfiles">
        <ProfilesManage />
      </DefaultLayout>
    ),
  },
]);

export default router;
