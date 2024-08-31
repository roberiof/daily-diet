import { Text } from "@/components/atoms/Text/text";
import Header from "@/components/molecules/Header/Header";
import PercentageMeals from "@/components/molecules/PercentageMeals/PercentageMeals";
import { router } from "expo-router";
import React from "react";
import { View, ScrollView } from "react-native";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import PaginatedMealCardsDates from "@/components/organisms/PaginatedMealCardsDates/PaginatedMealCardsDates";
import Button from "@/components/atoms/Button/Button";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const { user } = useAuthenticated();

  return (
    <View className="flex-1">
      <Header />
      <ScrollView className="px-4 space-y-8">
        <PercentageMeals percentage={80} />
        <View className="space-y-2">
          <Text>Refeições</Text>
          <Button onPress={() => router.push("/new-meal")}>
            <View className="flex flex-row items-center gap-2">
              <AntDesign name="plus" size={20} color="white" />
              <Text className="text-white font-bold">Nova refeição</Text>
            </View>
          </Button>
        </View>
        <View>
          <PaginatedMealCardsDates userId={user.id} />
        </View>
      </ScrollView>
    </View>
  );
}
