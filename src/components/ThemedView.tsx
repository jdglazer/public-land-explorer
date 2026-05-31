import { getColorTheme } from "@/hooks/getColorTheme";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ThemedViewProps {
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const ThemedView = ({ style, ...props }: ThemedViewProps) => {
  const insets = useSafeAreaInsets();
  // color scheme
  const colorThemeStyles = getColorTheme();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colorThemeStyles.backgroundColor,
        },
        styles.container,
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
