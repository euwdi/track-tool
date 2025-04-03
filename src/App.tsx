import "./styles/text.scss";
import "./styles/utils.scss";
import "./styles/root.scss";
import { RouterProvider } from "react-router";
import { mainRouter } from "./router/router";
import { useEffect, useState } from "react";
import { tokenService } from "./network/tokenService";
import { useUserStore } from "./stores/userStore";
import { Loader } from "./common/Loader/Loader";

function App() {
  const [profileLoaded, setProfileLoaded] = useState<boolean>();
  const { isAuth, getProfile } = useUserStore();

  useEffect(() => {
    const isToken = tokenService.isAccessToken();
    if (!profileLoaded) {
      if (isToken) {
        getProfile();
      } else {
        setProfileLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      setProfileLoaded(true);
    }
  }, [isAuth]);

  if (!profileLoaded)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
