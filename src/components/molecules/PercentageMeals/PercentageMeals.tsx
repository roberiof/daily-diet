import React from "react";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";

export interface PercentageMealsProps {
  percentage: number;
}

const PercentageMeals = ({ percentage }: PercentageMealsProps) => {
  const isGoodPercentage = percentage >= 80;
  return (
    <View
      className={cn(
        "w-full flex  justify-center items-center rounded-[8px] px-4 py-5 h-[100px]",
        isGoodPercentage ? "bg-green-light" : "bg-red-mid"
      )}
    >
      <Link href={"/stats-meals"} className="absolute top-3 right-3">
        <Feather
          name="external-link"
          size={24}
          color={isGoodPercentage ? "#639339" : "#BF3B44"}
        />
      </Link>
      <View className="flex items-center">
        <Text className="text-base-gray-700 font-bold text-[32px]">
          {percentage}%
        </Text>
        <Text className="text-base-gray-600 text-[14px]">
          das refeições dentro da dieta
        </Text>
      </View>
    </View>
  );
};

export default PercentageMeals;
