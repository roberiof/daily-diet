import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <Text> refeicao </Text>
      <Link href={"/meal/edit"}> editar </Link>
      <Link href={"/home"}> home </Link>
    </View>
  );
}
