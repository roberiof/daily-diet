import { ActivityIndicator, View } from "react-native";

const Loading = ({ color = "white" }: { color?: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={color} />
    </View>
  );
};

export default Loading;
