import { tokenService } from "@/network/tokenService";
import { FC, PropsWithChildren } from "react";
import { Routes } from "./router";
import { Navigate } from "react-router";

const PublicRouteGuard: FC<PropsWithChildren> = ({ children }) => {
  const isToken = tokenService.isAccessToken();

  if (!isToken) return children;

  return <Navigate to={Routes.TOOLS} />;
};

export { PublicRouteGuard };
