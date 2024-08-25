import { MealEntity } from "@/common/entities/Meal";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function MealCard({ mealData }: { mealData: MealEntity }) {
  const { title, hour, isInDiet } = mealData;

  return (
    <Link
      href="/see-meal"
      className="flex border border-gray-300 justify-between text-xs rounded-6"
    >
      <View className=" flex flex-row" style={{ rowGap: 2 }}>
        <Text className="text-grey-700 font-bold">{hour}</Text>
        <View className="h-full w-[1px] bg-[#313131]" />
        <Text className="text-gray-600">{title}</Text>
      </View>
      <View
        className={cn(
          "rounded-full w-[14px] h-[14px]",
          isInDiet ? "bg-green-mid" : "bg-red-mid"
        )}
      >
        {" "}
      </View>
    </Link>
  );
}
