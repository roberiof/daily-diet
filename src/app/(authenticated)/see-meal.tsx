import {
  getUserMealsQueryKey,
  useUserMeals
} from "@/hooks/queries/useUserMeals";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import { cn } from "@/lib/utils";
import { Link, router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Text } from "@/components/atoms/Text/text";
import { MealEntity } from "@/common/entities/Meal";
import { deleteFirestoreDoc } from "@/services/firestore";
import { useQueryClient } from "@tanstack/react-query";

export default function SeeMeal() {
  const queryClient = useQueryClient();
  const { mealId } = useLocalSearchParams();
  const { user } = useAuthenticated();
  const { data: meals } = useUserMeals({ userId: user.id });
  const currentMeal = meals?.find((meal) => meal.id === mealId) as MealEntity;
  const currentMealDate = new Date(currentMeal?.date.seconds * 1000);

  const onRemove = () => {
    Alert.alert("", "Are you sure you want to remove this meal", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Confirm",
        style: "destructive",
        onPress: async () => {
          await deleteFirestoreDoc(`meals/${currentMeal.id}`);
          queryClient.invalidateQueries({
            queryKey: getUserMealsQueryKey(user.id)
          });
          router.push("/home");
        }
      }
    ]);
  };

  if (!meals || !currentMeal) return;

  return (
    <View
      className={cn(
        "flex-1 pt-12 space-y-8",
        currentMeal.isInsideDiet ? "bg-green-light" : "bg-red-light"
      )}
    >
      <View className="relative text-center flex justify-center flex-row mx-4">
        <Link className="absolute left-0" href={"/home"}>
          <AntDesign name="arrowleft" size={24} color={"black"} />
        </Link>
        <Text className="text-base-gray-700 font-bold text-[18px]">Meal</Text>
      </View>
      <View className="rounded-t-[20px] bg-white h-[95%] px-6 py-8 flex justify-between">
        <View className="space-y-8">
          <View className="space-y-1">
            <Text className="text-base-gray-700 text-[20px] font-bold">
              {currentMeal.name}
            </Text>
            <Text className="text-base-gray-600">
              {currentMeal.description}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-base-gray-700 text-[20px] font-bold">
              Date and Hour
            </Text>
            <Text className="text-base-gray-600">
              {currentMealDate.toDateString() +
                " at " +
                currentMealDate.toLocaleTimeString()}
            </Text>
          </View>
          <View className="rounded-full px-4 py-2 bg-base-gray-200 flex flex-row  w-[135px] items-center">
            <View
              className={`rounded-full w-[10px] h-[10px] ${currentMeal.isInsideDiet ? "bg-green-dark" : "bg-red-dark"} mr-2`}
            ></View>
            <Text>
              {currentMeal.isInsideDiet ? "inside diet" : "out of diet"}
            </Text>
          </View>
        </View>

        <View className=" flex w-full space-y-2">
          <TouchableOpacity
            className="bg-base-gray-700 py-4 px-6 w-full rounded-[6px] text-center border-1 border-transparent disabled:opacity-30 flex items-center justify-center flex-row space-x-4"
            onPress={() => router.push("/new-meal?mealId=" + mealId)}
          >
            <Feather name="edit-2" size={18} color="white" />
            <Text className="text-white  font-medium">Edit meal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border-base-gray-700 border bg-transparent py-4 px-6 w-full rounded-[6px] text-center disabled:opacity-30 flex items-center justify-center flex-row space-x-4"
            onPress={onRemove}
          >
            <Feather name="trash-2" size={18} color="#1b1d1e" />
            <Text className="text-base-gray-700 font-medium">Remove meal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
