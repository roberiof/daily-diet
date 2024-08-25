import React, { memo } from "react";
import { View, Text } from "react-native";
import MealCard from "../MealCard/MealCard";
import { MealEntity } from "@/common/entities/Meal";
import { cn } from "@/lib/utils";

interface MealsByDateProps {
  meals: MealEntity[];
  date: Date;
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
          {date.toLocaleDateString()}
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
