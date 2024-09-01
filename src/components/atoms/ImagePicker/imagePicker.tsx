/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Image, Pressable } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { Controller, FieldValues } from "react-hook-form";
import Entypo from "@expo/vector-icons/Entypo";
import { ImagePickerProps } from "./types";
import { cn } from "@/lib/utils";

const ImagePicker = <T extends FieldValues>({
  control,
  name,
  error,
  editable = true
}: ImagePickerProps<T>) => {
  const pickImage = (onChange: (...event: any[]) => void) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1
      },
      (response) => {
        if (response.errorMessage) {
          Toast.show({
            type: "error",
            text1: "Image Picker Error",
            text2: response.errorMessage
          });
        } else {
          const uri = response.assets ? response.assets[0].uri : undefined;
          onChange(uri);
        }
      }
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="justify-center items-center w-full">
          <Pressable
            disabled={!editable}
            onPress={() => pickImage(onChange)}
            className={cn(
              "relative w-[100px] h-[100px] border-2 border-black p-2 rounded-full text-center px-5 py-2 border-dark-green-200 flex items-center justify-center",
              error && "border-red-600"
            )}
          >
            {value ? (
              <>
                <Image
                  source={{ uri: value }}
                  className="w-[100px] h-[100px] border-2 border-black rounded-full peer"
                />
                {editable && (
                  <View className="rounded-full bg-white w-[30px] h-[30px] absolute right-0 border border-black -bottom-2 flex items-center justify-center">
                    <Entypo name="cycle" size={18} color="black" />
                  </View>
                )}
              </>
            ) : (
              <Entypo
                name="camera"
                size={40}
                color={error ? "#dc2626" : "black"}
              />
            )}
          </Pressable>
        </View>
      )}
    />
  );
};

export default ImagePicker;
