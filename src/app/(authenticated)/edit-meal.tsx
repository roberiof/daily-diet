import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <Text> editando refeicao </Text>
      <Link href={"/home"}> refeicao </Link>
    </View>
  );
}
