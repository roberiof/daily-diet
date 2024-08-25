import { MealEntity } from "@/common/entities/Meal";
import MealsByDate from "@/components/molecules/MealsByDate/MealsByDate";
import { useUserMeals } from "@/hooks/queries/useUserMeals";
import React, { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";

const meals: MealEntity[] = [
  {
    id: "1",
    userId: "user1",
    title: "Breakfast",
    name: "Oatmeal with Fruits",
    description:
      "A healthy oatmeal with strawberries, blueberries, and bananas.",
    date: new Date("2024-08-24"),
    hour: "08:00",
    isInDiet: true
  },
  {
    id: "2",
    userId: "user1",
    title: "Lunch",
    name: "Grilled Chicken Salad",
    description:
      "Grilled chicken breast with mixed greens, tomatoes, and avocado.",
    date: new Date("2024-08-24"),
    hour: "13:00",
    isInDiet: true
  },
  {
    id: "3",
    userId: "user1",
    title: "Dinner",
    name: "Salmon with Quinoa",
    description: "Baked salmon served with quinoa and steamed broccoli.",
    date: new Date("2024-08-24"),
    hour: "19:00",
    isInDiet: true
  },
  {
    id: "4",
    userId: "user1",
    title: "Breakfast",
    name: "Greek Yogurt with Granola",
    description: "Greek yogurt topped with honey, granola, and mixed berries.",
    date: new Date("2024-08-25"),
    hour: "08:00",
    isInDiet: true
  },
  {
    id: "5",
    userId: "user1",
    title: "Lunch",
    name: "Turkey Sandwich",
    description: "Whole grain bread with turkey, lettuce, tomato, and mustard.",
    date: new Date("2024-08-25"),
    hour: "13:00",
    isInDiet: true
  },
  {
    id: "6",
    userId: "user1",
    title: "Dinner",
    name: "Pasta with Marinara Sauce",
    description:
      "Whole wheat pasta with homemade marinara sauce and a side salad.",
    date: new Date("2024-08-25"),
    hour: "19:00",
    isInDiet: true
  },
  {
    id: "7",
    userId: "user1",
    title: "Breakfast",
    name: "Smoothie Bowl",
    description:
      "Smoothie bowl made with acai, banana, almond milk, and topped with granola.",
    date: new Date("2024-08-26"),
    hour: "08:00",
    isInDiet: true
  },
  {
    id: "8",
    userId: "user1",
    title: "Lunch",
    name: "Chicken Wrap",
    description:
      "Whole wheat wrap filled with grilled chicken, lettuce, cucumber, and hummus.",
    date: new Date("2024-08-26"),
    hour: "13:00",
    isInDiet: true
  },
  {
    id: "9",
    userId: "user1",
    title: "Dinner",
    name: "Stir-fried Tofu with Vegetables",
    description: "Stir-fried tofu with mixed vegetables and brown rice.",
    date: new Date("2024-08-26"),
    hour: "19:00",
    isInDiet: true
  }
];

const PaginatedMealCardsDates = ({ userId }: { userId: string }) => {
  const [lastDate, setLastDate] = useState<Date | null>(null);

  const { data: mealsByDate, isLoading } = useUserMeals({
    userId,
    afterDate: lastDate ?? undefined,
    limitNumber: lastDate ? 5 : 10
  });
  const [shownData, setShownData] = useState<MealEntity[]>(meals);

  // useEffect(() => {
  //   if (
  //     mealsByDate &&
  //     shownData[shownData.length - 1].id !==
  //       mealsByDate[mealsByDate.length - 1].id
  //   ) {
  //     setShownData((prev) => [...prev, ...mealsByDate]);
  //   }
  // }, [mealsByDate, shownData]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={shownData}
        renderItem={({ item }) => <MealsByDate mealData={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          if (mealsByDate) {
            setLastDate(mealsByDate[mealsByDate?.length - 1].date);
          }
        }}
        onEndReachedThreshold={0.5} // Carrega mais quando chegar a 50% do fim da lista
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

export default PaginatedMealCardsDates;
