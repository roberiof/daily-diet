import { useUserMeals } from "@/hooks/queries/useUserMeals";
import { View, Text } from "react-native";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function StatsMeals() {
  const { user } = useAuthenticated();
  const { data: meals } = useUserMeals({ userId: user.id });

  const mealsInsideDiet = useMemo(() => {
    return meals?.filter((meal) => meal.isInsideDiet).length ?? 0;
  }, [meals]);

  const mealsNotInsideDiet = useMemo(() => {
    return meals?.filter((meal) => !meal.isInsideDiet).length ?? 0;
  }, [meals]);

  const percentageMeals = useMemo(() => {
    if (!meals) return 0;

    return Math.ceil((mealsInsideDiet / meals.length) * 100);
  }, [meals, mealsInsideDiet]);

  const bestStreak = useMemo(() => {
    if (!meals) return 0;

    let currentStreak = 0;
    let bestStreak = 0;

    meals.forEach((meal) => {
      if (meal.isInsideDiet) {
        currentStreak++;
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    });

    return bestStreak;
  }, [meals]);

  if (!meals) return;

  return (
    <View
      className={cn(
        "flex-1 pt-12 space-y-8",
        percentageMeals >= 80 ? "bg-green-light" : "bg-red-light"
      )}
    >
      <View className="relative text-center flex justify-center flex-row mx-4">
        <Link className="absolute left-0" href={"/home"}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={percentageMeals >= 80 ? "#639339" : "#BF3B44"}
          />
        </Link>
        <View className="text-[18px] font-bold flex items-center pb-4 pt-8 space-y-1">
          <Text className="text-base-gray-700 font-bold text-[32px]">
            {percentageMeals}%
          </Text>
          <Text className="text-[14px] font-normal text-base-gray-600">
            meals inside diet
          </Text>
        </View>
      </View>
      <View className="rounded-t-[20px] bg-white h-[80%] px-6 py-8 flex flex-col space-y-4">
        <Text className="text-center  text-base-gray-700 text-[14px] font-bold">
          General Statistics
        </Text>
        <View className="flex items-center p-4 space-y-1 rounded-[12px] bg-base-gray-200">
          <Text className="text-base-gray-700 font-bold text-[24px]">
            {bestStreak}
          </Text>
          <Text className="text-[14px] font-normal text-base-gray-600">
            best streak of meals inside diet{" "}
          </Text>
        </View>
        <View className="flex items-center p-4 space-y-1 rounded-[12px] bg-base-gray-200">
          <Text className="text-base-gray-700 font-bold text-[24px]">
            {meals.length}
          </Text>
          <Text className="text-[14px] font-normal text-base-gray-600">
            registered meals
          </Text>
        </View>

        <View className="flex items-center gap-2 flex-row">
          <View className="w-[48%] text-center flex items-center p-4 space-y-1 rounded-[12px] bg-green-light">
            <Text className="text-base-gray-700 font-bold text-[24px]">
              {mealsInsideDiet}
            </Text>
            <Text className="text-[14px] font-normal text-base-gray-600 text-center">
              meals inside diet
            </Text>
          </View>
          <View className="flex w-[48%] items-center p-4 space-y-1 rounded-[12px] bg-red-light">
            <Text className="text-base-gray-700 font-bold text-[24px]">
              {mealsNotInsideDiet}
            </Text>
            <Text className="text-[14px] font-normal text-base-gray-600 text-center">
              meals out of diet
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
