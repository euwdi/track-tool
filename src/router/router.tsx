import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login/page";
import { Layout } from "@/common/layout/Layout";
import { ToolsPage } from "@/features/tools/ToolsPage";
import { PublicRouteGuard } from "./PublicRouteGuard";
import { RouteGuard } from "./RouteGuard";
import { MyToolsPage } from "@/features/myTools/MyToolsPage";
import { StoragesPage } from "@/features/storages/StoragesPage";
import { UsersPage } from "@/features/users/UsersPage";

export enum Routes {
  LOGIN = "login",
  TOOLS = "tools",
  MY_TOOLS = "tools/me",
  MY_USER = "users/me",
  USERS = "users",
  STORAGES = "storages",
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
          {
            path: Routes.MY_TOOLS,
            element: <MyToolsPage />,
          },
          {
            path: Routes.MY_USER,
            element: <MyToolsPage />,
          },
          {
            path: Routes.USERS,
            element: <UsersPage />,
          },
          {
            path: Routes.STORAGES,
            element: <StoragesPage />,
          },
        ],
      },
    ],
  },
]);

export { mainRouter };
