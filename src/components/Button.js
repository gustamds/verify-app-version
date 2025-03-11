import { Pressable, Text } from "react-native";

export function Button({ onPress, title }) {
  return (
    <Pressable
      style={{
        backgroundColor: "#4be9e9",
        borderColor: "ciano",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}
