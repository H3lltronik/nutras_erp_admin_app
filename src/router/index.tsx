import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import { Test } from "../pages/Test/Test";
import { TestHeader } from "../pages/Test/TestHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout navContent={<HomeHeader />} headerTitle="Inicio">
        <Home />
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
