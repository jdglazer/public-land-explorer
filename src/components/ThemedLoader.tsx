import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";

interface ThemedLoaderProps {
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const ThemedLoader = ({ style, ...props }: ThemedLoaderProps) => {
  return (
    <ActivityIndicator
      style={[
        { flex: 1, alignItems: "center", justifyContent: "center" },
        style,
      ]}
      size="large"
      {...props}
    />
  );
};

export default ThemedLoader;
