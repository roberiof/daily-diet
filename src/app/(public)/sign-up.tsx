import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import SignUpFormSchema from "@/validations/signUp";
import ImagePickerComponent from "@/components/atoms/ImagePicker/imagePicker";
import { UserEntity } from "@/common/entities/User";
import { uploadImageToStorage } from "@/services/firebase-storage";
import { createUserWithEmailAndPassword } from "@/services/auth";
import { setFirestoreDoc } from "@/services/firestore";
import { getFilenameFromURI } from "@/utils/getFilenameFromUri";

type SignUpForm = z.infer<typeof SignUpFormSchema>;

export default function SignUp() {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const uploadData = await uploadImageToStorage(
      "/images",
      getFilenameFromURI(data.image),
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

    const { error, userId } = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    if (error) {
      Toast.show({
        type: "error",
        text1: "Register failed",
        text2: error
      });
      setLoading(false);
      return;
    }

    await setFirestoreDoc<Omit<UserEntity, "id">>(`users/${userId}`, {
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
    setLoading(true);
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
          editable={!loading}
        />
        <View className="w-full" style={{ gap: 16 }}>
          <Input
            editable={!loading}
            error={errors["name"]?.message}
            control={control}
            name="name"
            label="Name"
            placeholder="Enter your name"
          />
          <Input
            editable={!loading}
            error={errors["email"]?.message}
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            editable={!loading}
            error={errors["password"]?.message}
            control={control}
            name="password"
            label="Password"
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <Input
            editable={!loading}
            error={errors["confirmPassword"]?.message}
            control={control}
            name="confirmPassword"
            label="Confirmation Password"
            secureTextEntry={true}
            placeholder="Enter your password again"
          />
        </View>

        <Button onPress={handleSubmit(handleForm)} disabled={loading}>
          Sign up
        </Button>

        <Text>
          Already have an account?{" "}
          <Link href={"/sign-in"} className="underline" disabled={loading}>
            Sign in
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}
