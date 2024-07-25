import { Image, View, Text } from "react-native";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@atoms/Button/Button";
import Input from "@atoms/Input/Input";
import logo from "@assets/public/logo-bigger.png";
import SignInFormSchema from "@/validations/signIn";
import { authServices } from "@/services/auth";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema)
  });

  const handleForm = async (data: SignInForm) => {
    const { error } = await authServices.loginWithInternalService(
      data.email,
      data.password
    );

    if (error) {
      Toast.show({
        type: "error",
        text1: "Login falhou",
        text2: "Algo deu errado, tente novamente mais tarde"
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Login realizado com sucesso",
      text2: "Você será redirecionado para a tela principal"
    });
    reset();
  };

  return (
    <View
      style={{ gap: 16 }}
      className="flex-1 items-center justify-center h-screen w-[80%] mx-auto mb-16"
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
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      <Button onPress={handleSubmit(handleForm)}> Sign In </Button>

      <Text>
        Do not have an account yet?{" "}
        <Link href={"sign-up"} className="underline">
          Sign up
        </Link>
      </Text>
    </View>
  );
}
