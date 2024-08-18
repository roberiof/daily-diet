import { View, Text, ScrollView } from "react-native";
import React from "react";
import { z } from "zod";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import SignUpFormSchema from "@/validations/signUp";
import { authServices } from "@/services/auth";
import ImagePickerComponent from "@/components/atoms/ImagePicker/imagePicker";
import FirestoreService from "@/services/firestore";
import { UserEntity } from "@/common/entities/User";
import FirebaseStorageService from "@/services/firebase-storage";

const usersFirestore = new FirestoreService<Omit<UserEntity, "id">>("users");
const storageFbImages = new FirebaseStorageService("images");
type SignUpForm = z.infer<typeof SignUpFormSchema>;

export default function SignUp() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema)
  });

  const handleForm = async (data: SignUpForm) => {
    if (!data.image) {
      Toast.show({
        type: "error",
        text1: "Insert an image"
      });
      return;
    }
    let imageUrl: string | null = null;

    storageFbImages
      .uploadImage("Imagem 1", data.image)
      .then((response) => (imageUrl = response))
      .catch(() =>
        Toast.show({
          type: "error",
          text1: "Image upload went wrong. Try again later"
        })
      );

    const { error, userId } = await authServices.createUserWithInternalService(
      data.email,
      data.password
    );

    if (error || !userId) {
      Toast.show({
        type: "error",
        text1: "Register failed",
        text2: "Something went wrong. Try again later!"
      });
      return;
    }

    usersFirestore.createDoc(userId, {
      email: data.email,
      name: data.name,
      image: imageUrl
    });

    Toast.show({
      type: "success",
      text1: "Welcome!",
      text2: "You were register successfully!"
    });
    reset();
    router.push("/(authenticated)/home");
  };

  return (
    <ScrollView>
      <View
        style={{ gap: 32 }}
        className="flex-1 items-center justify-center h-screen w-[80%] mx-auto"
      >
        <ImagePickerComponent
          control={control}
          name={"image"}
          error={errors["image"]?.message}
        />
        <View className="w-full" style={{ gap: 16 }}>
          <Input
            error={errors["name"]?.message}
            control={control}
            name="name"
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            error={errors["email"]?.message}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            error={errors["password"]?.message}
            control={control}
            name="password"
            label="Password"
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <Input
            error={errors["password"]?.message}
            control={control}
            name="confirmPassword"
            label="Confirmation Password"
            secureTextEntry={true}
            placeholder="Enter your password again"
          />
        </View>

        <Button onPress={handleSubmit(handleForm)}> Sign In </Button>

        <Text>
          Already have an account?{" "}
          <Link href={"/sign-in"} className="underline">
            Sign in
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}
