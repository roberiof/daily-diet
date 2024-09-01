import { Pressable, View } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import EditProfileSchema from "@/validations/editProfile";
import ImagePickerComponent from "@/components/atoms/ImagePicker/imagePicker";
import { UserEntity } from "@/common/entities/User";
import {
  deleteImageFromStorage,
  uploadImageToStorage
} from "@/services/firebase-storage";
import { updateFirestoreDoc } from "@/services/firestore";
import { useAuthenticated } from "../../../templates/Authenticated/provider/AuthenticatedContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQueryClient } from "@tanstack/react-query";
import { getProfileQueryKey } from "@/hooks/queries/useProfile";
import { logout } from "@/services/auth";
import { Text } from "@/components/atoms/Text/text";

type EditProfileForm = z.infer<typeof EditProfileSchema>;

export default function SignUp() {
  const { user } = useAuthenticated();
  const queryClient = useQueryClient();
  const [isEditValid, setIsEditValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<EditProfileForm>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name,
      image: user.image,
      email: user.email
    }
  });

  const handleForm = async (data: EditProfileForm) => {
    if (!data.image) {
      Toast.show({
        type: "error",
        text1: "Insert an image"
      });
      return;
    }
    let imageUrl: string | null = data.image;
    setLoading(true);

    if (data.image !== user.image) {
      const uploadData = await uploadImageToStorage(
        "/images",
        data.image,
        data.image
      );

      imageUrl = uploadData.downloadURL as string;

      if (uploadData.error) {
        Toast.show({
          type: "error",
          text1: "Image upload went wrong. Try again later"
        });
        setLoading(false);
        return;
      }

      await deleteImageFromStorage("/images", user.image);
    }

    updateFirestoreDoc<Omit<UserEntity, "id">>(`users/${user.id}`, {
      name: data.name,
      image: imageUrl
    });
    queryClient.invalidateQueries({
      queryKey: getProfileQueryKey(user.id)
    });

    Toast.show({
      type: "success",
      text1: "Success!",
      text2: "Profile updated!"
    });
    reset();
    router.push("/(authenticated)/home");
    setLoading(true);
  };

  return (
    <View className="h-full flex-1 w-full mx-auto bg-base-gray-300">
      <View className=" py-12 px-4 flex flex-row justify-between items-center">
        <Link href={"/home"}>
          <AntDesign name="arrowleft" size={24} color={"black"} />
        </Link>
        <Pressable
          onPress={() => logout()}
          className="border-red-600 border-2 rounded-[8px] p-2 w-[90px] bg-transparent flex items-center"
        >
          <Text className="text-red-600 text-[16px]">Sign Out</Text>
        </Pressable>
      </View>

      <View
        style={{ gap: 32 }}
        className="py-16 h-[90%] bg-white px-8 rounded-t-[20px]"
      >
        <ImagePickerComponent
          control={control}
          name={"image"}
          error={errors["image"]?.message}
          editable={!loading && isEditValid}
        />
        <View className="w-full" style={{ gap: 16 }}>
          <Input
            editable={!loading && isEditValid}
            error={errors["name"]?.message}
            control={control}
            name="name"
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            editable={false}
            error={errors["email"]?.message}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
        </View>

        {!isEditValid ? (
          <Button onPress={() => setIsEditValid(true)} disabled={loading}>
            Edit
          </Button>
        ) : (
          <View className="flex flex-col gap-2">
            <Button
              onPress={handleSubmit(handleForm)}
              disabled={loading}
              loading={loading}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onPress={() => setIsEditValid(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
