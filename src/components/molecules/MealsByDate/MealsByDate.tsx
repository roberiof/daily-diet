import React, { memo } from "react";
import { View, Text } from "react-native";
import MealCard from "../MealCard/MealCard";
import { MealEntity } from "@/common/entities/Meal";
import { cn } from "@/lib/utils";
import { Timestamp } from "@/common/entities/Timestamp";

interface MealsByDateProps {
  meals: MealEntity[];
  date: Timestamp;
  className?: string;
}

const MealsByDate: React.FC<MealsByDateProps> = ({
  meals,
  date,
  className
}) => {
  return (
    <View className={cn("flex space-y-2 mb-4", className)}>
      {date && (
        <Text className="text-gray-700 font-bold text-[18px]">
          {new Date(date.seconds * 1000).toLocaleDateString()}
        </Text>
      )}
      <View className="flex">
        {meals.map((item) => (
          <MealCard mealData={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export default memo(MealsByDate);
