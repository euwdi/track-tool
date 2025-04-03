import { FC, PropsWithChildren } from "react";
import { Routes } from "./router";
import { tokenService } from "@/network/tokenService";
import { Navigate, Outlet, useLocation } from "react-router";

const RouteGuard: FC<PropsWithChildren> = () => {
  const isToken = tokenService.isAccessToken();
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={Routes.TOOLS} />;
  }

  if (isToken) {
    return <Outlet />;
  }

  return <Navigate to={`/${Routes.LOGIN}`} />;
};

export { RouteGuard };
