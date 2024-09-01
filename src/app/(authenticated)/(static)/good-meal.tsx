import Button from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/text";
import { router } from "expo-router";
import image from "@assets/public/happy-person.png";
import { Image, View } from "react-native";

export default function GoodMeal() {
  return (
    <View className="flex-1 text-center items-center justify-center bg-base-gray-100 gap-y-8">
      <View className="items-center">
        <Text className="text-green-dark text-[24px] mb-2 font-bold">
          Keep going!
        </Text>
        <Text>
          You are still <Text className="font-bold">on the diet</Text>. Very
          good!
        </Text>
      </View>
      <Image source={image} style={{ width: 235, height: 340 }} />
      <Button
        onPress={() => router.push("/home")}
        className="w-[180px] flex items-center justify-center p-5 pl-7 pt-6 m-0 "
      >
        <Text>Go to home page</Text>
      </Button>
    </View>
  );
}
