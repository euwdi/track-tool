import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login/page";
import { Layout } from "@/common/layout/Layout";
import { ToolsPage } from "@/features/tools/ToolsPage";
import { PublicRouteGuard } from "./PublicRouteGuard";
import { RouteGuard } from "./RouteGuard";

export enum Routes {
  LOGIN = "login",
  TOOLS = "tools",
}

const mainRouter = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: (
      <PublicRouteGuard>
        <LoginPage />
      </PublicRouteGuard>
    ),
  },

  {
    path: "*",
    element: <RouteGuard />,
    children: [
      {
        path: "*",
        element: <Layout />,
        children: [
          {
            path: Routes.TOOLS,
            element: <ToolsPage />,
          },
        ],
      },
    ],
  },
]);

export { mainRouter };
