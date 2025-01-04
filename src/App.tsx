import "./styles/text.scss";
import "./styles/utils.scss";
import "./styles/root.scss";
import { RouterProvider } from "react-router";
import { mainRouter } from "./router/router";

function App() {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
