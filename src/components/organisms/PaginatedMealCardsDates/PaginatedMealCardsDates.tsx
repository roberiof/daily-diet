import { MealEntity } from "@/common/entities/Meal";
import { Timestamp } from "@/common/entities/Timestamp";
import MealsByDate from "@/components/molecules/MealsByDate/MealsByDate";
import { useUserMeals } from "@/hooks/queries/useUserMeals";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

interface MealsByDate {
  meals: MealEntity[];
  date: Timestamp;
}

export const groupMealsByDate = (meals: MealEntity[]): MealsByDate[] => {
  const groupedMeals: { [key: string]: MealsByDate } = {};

  meals.forEach((meal) => {
    const dateKey = new Date(meal.date.seconds * 1000).toDateString(); // Use timestamp as a unique key

    if (!groupedMeals[dateKey]) {
      groupedMeals[dateKey] = {
        meals: [],
        date: meal.date
      };
    }

    groupedMeals[dateKey].meals.push(meal);
  });

  return Object.values(groupedMeals).sort(
    (a, b) => b.date.seconds - a.date.seconds
  );
};

const PaginatedMealCardsDates = ({ userId }: { userId: string }) => {
  // const [lastDate, setLastDate] = useState<Date | null>(null);

  const { data: mealsByDate } = useUserMeals({
    userId
    // afterDate: lastDate ?? undefined,
    // limitNumber: lastDate ? 5 : 10
  });
  const [shownData, setShownData] = useState<MealsByDate[]>();

  // useEffect(() => {
  //   if (
  //     mealsByDate &&
  //     shownData[shownData.length - 1].id !==
  //       mealsByDate[mealsByDate.length - 1].id
  //   ) {
  //     setShownData((prev) => [...prev, ...mealsByDate]);
  //   }
  // }, [mealsByDate, shownData]);

  useEffect(() => {
    if (mealsByDate && mealsByDate.length) {
      setShownData(groupMealsByDate(mealsByDate));
    }
  }, [mealsByDate]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={shownData}
        renderItem={({ item }) => (
          <MealsByDate meals={item.meals} date={item.date} className="mb-4" />
        )}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={() => {
        //   if (mealsByDate) {
        //     setLastDate(mealsByDate[]);
        //   }
        // }}
        // onEndReachedThreshold={0.5} // Carrega mais quando chegar a 50% do fim da lista
        // ListFooterComponent={
        //   isLoading ? <ActivityIndicator size="large" color="black" /> : null
        // }
      />
    </View>
  );
};

export default PaginatedMealCardsDates;
