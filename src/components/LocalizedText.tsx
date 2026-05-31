import { getColorTheme } from "@/hooks/getColorTheme";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
  component: string;
  identifier: string;
  style?: StyleProp<TextStyle>;
  [key: string]: any;
}

const LocalizedText = ({ component, identifier, style, ...props }: Props) => {
  // color scheme
  const colorThemeStyles = getColorTheme();

  return (
    <Text style={[{ color: colorThemeStyles.textColor }, style]} {...props}>
      {getLocalizedText(component, identifier)}
    </Text>
  );
};

export default LocalizedText;
