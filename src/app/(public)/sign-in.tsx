import { Image, View } from "react-native";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import logo from "@assets/public/logo.png";
import SignInFormSchema from "@/validations/signIn";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema)
  });

  const handleForm = (data: SignInForm) => {
    console.log(data);
  };

  return (
    <View
      style={{ gap: 16 }}
      className="flex-1 items-center justify-center h-screen w-[80%] mx-auto mb-8"
    >
      <Image source={logo} className="mb-8" />
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
        placeholder="Enter your password"
      />
      <Button onPress={handleSubmit(handleForm)}> Sign In </Button>
    </View>
  );
}
