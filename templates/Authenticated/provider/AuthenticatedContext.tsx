/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, createContext, useContext } from "react";
import { useAuth } from "@/providers/Auth/Auth";
import { UserEntity } from "@/common/entities/User";
import Loading from "@/components/atoms/Loading/Loading";
import { router } from "expo-router";

const AuthenticatedContext = createContext({} as { user: UserEntity });

export const AuthenticatedProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();

  if (!user) {
    router.replace("/sign-in");
    return <Loading />;
  }

  return (
    <AuthenticatedContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
};

export const useAuthenticated = () => {
  return useContext(AuthenticatedContext);
};