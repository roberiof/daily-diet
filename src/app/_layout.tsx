import React, { useEffect } from "react";

import {
  useFonts,
  NunitoSans_700Bold,
  NunitoSans_400Regular
} from "@expo-google-fonts/nunito-sans";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";

import Loading from "@/components/atoms/Loading/Loading";
import { AuthProvider, useAuth } from "@/providers/Auth/Auth";
import Toast from "react-native-toast-message";
import { clientPersister, clientQuery } from "@/lib/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

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
  const [loaded, error] = useFonts({
    NunitoSans_700Bold,
    NunitoSans_400Regular
  });

  useEffect(() => {
    if (error) throw error;
    // console.log(error);
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
    <PersistQueryClientProvider
      client={clientQuery}
      persistOptions={{ persister: clientPersister }}
    >
      <AuthProvider>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={"transparent"}
        />
        <RootLayoutNav />
        <Toast />
      </AuthProvider>
    </PersistQueryClientProvider>
  );
};

const RootLayoutNav = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(authenticated)/home");
    } else {
      router.replace("/(public)/sign-in");
    }
  }, [user, router]);

  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
