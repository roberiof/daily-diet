import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import logo from "@assets/public/logo-bigger.png";
import SignInFormSchema from "@/validations/signIn";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import { loginWithEmailAndPassword } from "@/services/auth";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema)
  });

  const handleForm = async (data: SignInForm) => {
    setLoading(true);
    const { error } = await loginWithEmailAndPassword(
      data.email,
      data.password
    );

    if (error) {
      Toast.show({
        type: "error",
        text1: "Sign in failed",
        text2: error
      });
      setLoading(false);
      return;
    }
    reset();
    setLoading(false);
  };

  return (
    <ScrollView>
      <View
        style={{ gap: 16 }}
        className="flex-1 items-center justify-center h-screen w-[80%] mx-auto mb-16"
      >
        <Image source={logo} className="mb-8" />
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
        <Button onPress={handleSubmit(handleForm)} disabled={loading}>
          Sign In
        </Button>

        <Text>
          Do not have an account yet?{" "}
          <Link href={"/sign-up"} className="underline" disabled={loading}>
            Sign up
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}
