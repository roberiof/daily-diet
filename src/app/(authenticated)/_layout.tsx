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
        {/* <Stack.Screen name="new-meal" options={{ headerShown: false }}>
        {() => <NewMealScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="see-meal" options={{ headerShown: false }}>
        {() => <SeeMealScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="edit-meal" options={{ headerShown: false }}>
        {() => <EditMealScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="stats-meals" options={{ headerShown: false }}>
        {() => <StatsMealsScreen user={user} />}
      </Stack.Screen> */}
      </Stack>
    </AuthenticatedTemplate>
  );
};

export default AuthLayout;
