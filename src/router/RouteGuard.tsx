import { FC, PropsWithChildren } from "react";
import { Routes } from "./router";
import { tokenService } from "@/network/tokenService";
import { Navigate, Outlet } from "react-router";

const RouteGuard: FC<PropsWithChildren> = () => {
  return <Outlet />;
  // const isToken = tokenService.isAccessToken();

  // if (isToken) {
  //   return <Outlet />;
  // }

  // return <Navigate to={`/${Routes.LOGIN}`} />;
};

export { RouteGuard };
