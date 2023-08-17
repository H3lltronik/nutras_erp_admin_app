import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import Login from "../pages/Login/Login";
import { Test } from "../pages/Test/Test";
import { TestHeader } from "../pages/Test/TestHeader";
import { Users } from "../pages/Users";
import { UsersHeader } from "../pages/Users/UsersHeader";
import { Products } from "../pages/Products";
import { ProductsHeader } from "../pages/Products/ProductsHeader";
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
        <Users />
      </DefaultLayout>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <DefaultLayout navContent={<ProductsHeader />} headerTitle="Productos">
        <Products />
      </DefaultLayout>
    ),
  },
  {
    path: "/test",
    element: (
      <DefaultLayout navContent={<TestHeader />}>
        <Test />
      </DefaultLayout>
    ),
  },
]);

export default router;
