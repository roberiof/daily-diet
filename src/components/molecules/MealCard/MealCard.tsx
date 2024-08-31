import { MealEntity } from "@/common/entities/Meal";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function MealCard({ mealData }: { mealData: MealEntity }) {
  const { name, date, isInsideDiet } = mealData;

  return (
    <Pressable
      className="border flex-row border-gray-300 items-center justify-between text-xs rounded-[6px] pl-[12px] py-[14px] pr-[16px] flex w-full mb-2"
      onPress={() => router.push("/see-meal")}
    >
      <View className="flex flex-row space-x-2">
        <Text className="text-base-gray-700 font-bold">
          {new Date(date.seconds * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </Text>
        <View className="w-[1px] bg-base-gray-400" />
        <Text className="text-base-gray-600">{name}</Text>
      </View>
      <View
        className={cn(
          "rounded-full w-[14px] h-[14px]",
          isInsideDiet ? "bg-green-mid" : "bg-red-mid"
        )}
      ></View>
    </Pressable>
  );
}
