import { Image, Pressable } from "react-native";
import logo from "@assets/public/logo.png";
import { useAuth } from "@/providers/Auth/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";

export default function Header() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex flex-row justify-between items-center p-4">
      <Image source={logo} />
      <Pressable
        onPress={() => router.push("/profile")}
        className="w-[45px] h-[45px] flex justify-center items-center border-2 border-black rounded-full"
      >
        <Image
          source={{ uri: user?.image }}
          className="w-[40px] h-[40px] border-2 border-black rounded-full"
        />
      </Pressable>
    </SafeAreaView>
  );
}
