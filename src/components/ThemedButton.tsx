import React from "react";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";

interface ThemedButtonProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const ThemedButton = ({ text, style, ...props }: ThemedButtonProps) => {
  return (
    <Pressable
      style={[
        {
          alignItems: "center",
          width: "80%",
          borderRadius: 6,
          backgroundColor: "#4eeeee",
        },
        style,
      ]}
      {...props}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

export default ThemedButton;
