import { View, Text } from "react-native";
import MealCard from "../MealCard/MealCard";
import { MealEntity } from "@/common/entities/Meal";

interface MealsByDateProps {
  mealData: MealEntity;
}

export default function MealsByDate({ mealData }: MealsByDateProps) {
  return (
    <View className="flex-1">
      <Text className="text-gray-700 font-bold text-[18px]"> 12.08.22 </Text>
      <MealCard mealData={mealData} />
    </View>
  );
}
