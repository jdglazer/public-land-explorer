import { getColorTheme } from "@/hooks/getColorTheme";
import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";

interface ThemedTextInputProps {
  placeholder: string;
  style?: StyleProp<TextStyle>;
  [key: string]: any;
}

const ThemedTextInput = ({
  placeholder,
  value,
  onChange,
  password,
  style,
  ...props
}: ThemedTextInputProps) => {
  // color scheme
  const colorThemeStyles = getColorTheme();

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={password}
      onChangeText={onChange}
      style={[{ color: colorThemeStyles.textColor }, style]}
      {...props}
    />
  );
};

export default ThemedTextInput;
