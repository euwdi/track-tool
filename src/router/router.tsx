import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login/page";
import { Layout } from "@/common/layout/Layout";
import { InstrumentsPage } from "@/features/instruments/InstrumentsPage";

const mainRouter = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Layout/>,
    children: [
      {
        path: "instruments",
        element: <InstrumentsPage />,
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
