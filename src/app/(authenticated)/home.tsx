import { Text } from "@/components/atoms/Text/text";
import Header from "@/components/molecules/Header/Header";
import PercentageMeals from "@/components/molecules/PercentageMeals/PercentageMeals";
import { router } from "expo-router";
import React from "react";
import { View, ScrollView } from "react-native";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import PaginatedMealCardsDates from "@/components/organisms/PaginatedMealCardsDates/PaginatedMealCardsDates";
import Button from "@/components/atoms/Button/Button";

export default function Home() {
  const { user } = useAuthenticated();

  return (
    <View className="flex-1">
      <Header />
      <ScrollView className="px-4 ">
        <PercentageMeals percentage={80} />

        <View>
          <Text>Refeições</Text>
          <Button onPress={() => router.push("/new-meal")}>
            Nova refeição
          </Button>
        </View>

        <View className="h-[200px] bg-black">
          <PaginatedMealCardsDates userId={user.id} />
        </View>
      </ScrollView>
    </View>
  );
}
