import "./styles/text.scss";
import "./styles/utils.scss";
import "./styles/root.scss";
import { RouterProvider } from "react-router";
import { mainRouter } from "./router/router";
import { useEffect, useState } from "react";
import { tokenService } from "./network/tokenService";
import { useUserStore } from "./stores/userStore";
import { Loader } from "./common/Loader/Loader";
import { useRolesStore } from "./stores/rolesStore";
import { Notifications } from "./common/components/Notifications/Notification";

function App() {
  const [profileLoaded, setProfileLoaded] = useState<boolean>();
  const { isAuth, getProfile } = useUserStore();
  const { uniqueRole } = useRolesStore();

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

  if (uniqueRole === 1)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader text={1} />
      </div>
    );

  if (uniqueRole === 2)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader text={2} />
      </div>
    );

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
    <div>
      <Notifications />
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;
