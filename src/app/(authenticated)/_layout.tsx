import { Stack } from "expo-router";
import React from "react";
import AuthenticatedTemplate from "../../../templates/Authenticated/authenticatedTemplate";

const AuthLayout = () => {
  return (
    <AuthenticatedTemplate>
      <Stack>
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="new-meal"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(static)/good-meal"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="(static)/bad-meal"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="stats-meals"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="see-meal"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </AuthenticatedTemplate>
  );
};

export default AuthLayout;
