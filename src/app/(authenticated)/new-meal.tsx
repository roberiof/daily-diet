import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "@/components/atoms/Input/Input";
import AddMealSchema from "@/validations/addMeal";
import { useState } from "react";
import { z } from "zod";
import DatePickerModal from "@/components/atoms/DatePicker/DatePicker";
import Button from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/text";
import { addFirestoreDoc } from "@/services/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import { getUserMealsQueryKey } from "@/hooks/queries/useUserMeals";

type AddMealForm = z.infer<typeof AddMealSchema>;

export default function NewMeal() {
  const { user } = useAuthenticated();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<AddMealForm>({
    resolver: zodResolver(AddMealSchema)
  });
  const queryClient = useQueryClient();

  const handleForm = async (data: AddMealForm) => {
    setLoading(true);
    await addFirestoreDoc("meals", data);
    queryClient.invalidateQueries({
      queryKey: getUserMealsQueryKey(user.id)
    });
    reset();

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
        <Text className="text-[18px] font-bold">Nova refeição</Text>
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
            name="date"
            className="w-full"
          />
          <View className="mb-6 mt-6 space-y-1">
            <Text>Está dentro da dieta?</Text>
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
          <Text>Cadastrar refeição</Text>
        </Button>
      </View>
    </View>
  );
}
