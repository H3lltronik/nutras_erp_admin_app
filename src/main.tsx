import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";

import appleIcon from "./assets/favicon/apple-touch-icon.png";
import favicon16 from "./assets/favicon/favicon-16x16.png";
import favicon32 from "./assets/favicon/favicon-32x32.png";
import safariTab from "./assets/favicon/safari-pinned-tab.svg";
import manifest from "./assets/favicon/site.webmanifest";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Helmet>
      <link rel="apple-touch-icon" sizes="180x180" href={appleIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="manifest" href={manifest} />
      <link rel="mask-icon" href={safariTab} color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
