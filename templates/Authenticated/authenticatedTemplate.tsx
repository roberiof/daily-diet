import React, { ReactNode } from "react";
import { AuthenticatedProvider } from "./provider/AuthenticatedContext";

const AuthenticatedTemplate = ({ children }: { children: ReactNode }) => {
  return <AuthenticatedProvider>{children}</AuthenticatedProvider>;
};

export default AuthenticatedTemplate;
