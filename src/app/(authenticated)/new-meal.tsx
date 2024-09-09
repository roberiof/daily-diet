import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/Input/Input";
import AddMealSchema from "@/validations/addMeal";
import { useState } from "react";
import { z } from "zod";
import DatePickerModal from "@/components/atoms/DatePicker/DatePicker";
import Button from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/text";
import { addFirestoreDoc, updateFirestoreDoc } from "@/services/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import {
  getUserMealsQueryKey,
  useUserMeals
} from "@/hooks/queries/useUserMeals";
import { MealEntity } from "@/common/entities/Meal";
import { Timestamp } from "@react-native-firebase/firestore";

type AddMealForm = z.infer<typeof AddMealSchema>;

export default function NewMeal() {
  const { user } = useAuthenticated();
  const [loading, setLoading] = useState(false);
  const { mealId } = useLocalSearchParams();
  const isEditing = !!mealId;
  const { data: meals } = useUserMeals({ userId: user.id });
  const currentMeal = meals?.find((item) => item.id === mealId);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<AddMealForm>({
    resolver: zodResolver(AddMealSchema),
    defaultValues: {
      isInsideDiet: currentMeal?.isInsideDiet ? "yes" : "no",
      name: currentMeal?.name ?? "",
      date: currentMeal?.date.seconds
        ? new Date(currentMeal.date.seconds * 1000)
        : new Date(),
      description: currentMeal?.description ?? ""
    }
  });
  const queryClient = useQueryClient();

  const handleForm = async (data: AddMealForm) => {
    setLoading(true);

    if (isEditing) {
      await updateFirestoreDoc<MealEntity>(`meals/${mealId}`, {
        date: Timestamp.fromDate(data.date),
        isInsideDiet: data.isInsideDiet === "yes",
        name: data.name,
        userId: user.id,
        description: data.description
      });
    } else {
      await addFirestoreDoc<MealEntity>("meals", {
        date: Timestamp.fromDate(data.date),
        isInsideDiet: data.isInsideDiet === "yes",
        name: data.name,
        userId: user.id,
        description: data.description
      });
      reset();
    }
    await queryClient.invalidateQueries({
      queryKey: getUserMealsQueryKey(user.id)
    });

    if (data.isInsideDiet === "yes") {
      router.replace("/good-meal");
    }

    if (data.isInsideDiet === "no") {
      router.replace("/bad-meal");
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-base-gray-300 pt-12 space-y-8">
      <View className="relative text-center flex justify-center flex-row mx-4">
        <Link className="absolute left-0" href={"/home"}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Link>
        <Text className="text-[18px] font-bold">
          {isEditing ? "Edit meal " : "New meal"}
        </Text>
      </View>
      <View className="rounded-t-[20px] bg-white h-[95%] px-8 py-12 flex flex-col justify-between">
        <View>
          <Input
            editable={!loading}
            error={errors["name"]?.message}
            control={control}
            name="name"
            label="Name"
            placeholder="Enter the meal name"
            className="mb-6"
          />
          <Input
            editable={!loading}
            error={errors["description"]?.message}
            control={control}
            name="description"
            label="Description"
            placeholder="Enter a description to the meal"
            className="mb-6"
          />
          <DatePickerModal
            label="Date and Hour"
            control={control}
            editable={!isEditing}
            name="date"
            className="w-full"
          />
          <View className="mb-6 mt-6 space-y-1">
            <Text>Is it inside diet?</Text>
            <View className="flex flex-row gap-2">
              <Button
                className="w-1/2"
                variant={
                  watch("isInsideDiet") === "yes"
                    ? "greenSelected"
                    : "greenNotSelected"
                }
                onPress={() => setValue("isInsideDiet", "yes")}
              >
                <View className="flex flex-row gap-2 items-center">
                  <View className="rounded-full w-[10px] h-[10px] bg-green-dark"></View>
                  <Text>Yes</Text>
                </View>
              </Button>
              <Button
                className="w-1/2"
                variant={
                  watch("isInsideDiet") === "no"
                    ? "redSelected"
                    : "redNotSelected"
                }
                onPress={() => setValue("isInsideDiet", "no")}
              >
                <View className="flex flex-row gap-2 items-center">
                  <View className="rounded-full w-[10px] h-[10px] bg-red-dark"></View>
                  <Text>No</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>

        <Button onPress={handleSubmit(handleForm)}>
          <Text>{isEditing ? "Edit" : "Register"}</Text>
        </Button>
      </View>
    </View>
  );
}
