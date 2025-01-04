import { createBrowserRouter } from "react-router";
import { LoginPage } from "@features/login/page";

const mainRouter = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
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
