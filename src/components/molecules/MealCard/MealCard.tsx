import { MealEntity } from "@/common/entities/Meal";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function MealCard({ mealData }: { mealData: MealEntity }) {
  const { title, hour, isInDiet } = mealData;

  return (
    <Pressable
      className="border flex-row border-gray-300 items-center justify-between text-xs rounded-[6px] pl-[12px] py-[14px] pr-[16px] flex w-full mb-2"
      onPress={() => router.push("/see-meal")}
    >
      <View className="flex flex-row space-x-2">
        <Text className="text-grey-700 font-bold">{hour}</Text>
        <View className="h-full w-[1px] bg-[#313131]" />
        <Text className="text-gray-600">{title}</Text>
      </View>
      <View
        className={cn(
          "rounded-full w-[14px] h-[14px]",
          isInDiet ? "bg-green-mid" : "bg-red-mid"
        )}
      ></View>
    </Pressable>
  );
}
