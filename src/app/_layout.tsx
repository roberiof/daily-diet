import React, { useEffect } from "react";

import {
  useFonts,
  NunitoSans_700Bold,
  NunitoSans_400Regular
} from "@expo-google-fonts/nunito-sans";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";

import Loading from "@/components/atoms/Loading/Loading";
import { AuthContextData, AuthProvider, useAuth } from "@/providers/Auth";
import Toast from "react-native-toast-message";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(public)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { userUid } = useAuth();
  const [loaded, error] = useFonts({
    NunitoSans_700Bold,
    NunitoSans_400Regular
  });

  useEffect(() => {
    if (error) throw error;
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <RootLayoutNav userUid={userUid} />
      <Toast />
    </AuthProvider>
  );
};

const RootLayoutNav = ({
  userUid
}: {
  userUid: AuthContextData["userUid"];
}) => {
  const router = useRouter();

  useEffect(() => {
    if (userUid) {
      router.replace("/(authenticated)/home");
    } else {
      router.replace("/(public)/sign-in");
    }
  }, [userUid, router]);

  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
