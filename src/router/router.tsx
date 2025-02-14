import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login/page";
import { Layout } from "@/common/layout/Layout";
import { ToolsPage } from "@/features/tools/ToolsPage";

export enum Routes {
  LOGIN = "login",
  TOOLS = "tools",
}

const mainRouter = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: <LoginPage />,
  },
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

  {
    path: "registration",
    element: (() => <div>Home</div>)(),
  },
  //guard
  {
    path: "*",
    element: (() => <div>Home</div>)(),
  },
]);

export { mainRouter };
