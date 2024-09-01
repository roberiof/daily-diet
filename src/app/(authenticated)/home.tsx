import { Text } from "@/components/atoms/Text/text";
import Header from "@/components/molecules/Header/Header";
import PercentageMeals from "@/components/molecules/PercentageMeals/PercentageMeals";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import PaginatedMealCardsDates from "@/components/organisms/PaginatedMealCardsDates/PaginatedMealCardsDates";
import Button from "@/components/atoms/Button/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserMeals } from "@/hooks/queries/useUserMeals";

export default function Home() {
  const { user } = useAuthenticated();
  const { data: meals } = useUserMeals({ userId: user.id });

  const percentageMeals = useMemo(() => {
    if (!meals?.length) return 0;
    return Math.ceil(
      (meals.filter((m) => m.isInsideDiet).length / meals.length) * 100
    );
  }, [meals]);

  return (
    <View className="flex-1">
      <Header />
      <View className="px-4 space-y-8">
        {!meals || meals?.length === 0 ? (
          <View
            className={
              "w-full flex  justify-center items-center rounded-[8px] px-4 py-5 h-[100px] bg-base-gray-300"
            }
          >
            <Text className="font-medium">Add your first meal</Text>
          </View>
        ) : (
          <PercentageMeals percentage={percentageMeals} />
        )}
        <View className="space-y-2">
          <Text>Meals</Text>
          <Button onPress={() => router.push("/new-meal")}>
            <View className="flex flex-row items-center gap-2">
              <AntDesign name="plus" size={20} color="white" />
              <Text className="text-white font-bold">New meal</Text>
            </View>
          </Button>
        </View>
        <View className="h-[60%]">
          <PaginatedMealCardsDates userId={user.id} />
        </View>
      </View>
    </View>
  );
}
