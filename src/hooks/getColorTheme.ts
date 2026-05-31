import { ColorThemes } from "@/constants/styles/ColorThemes";
import { useColorScheme } from "react-native";

export function getColorTheme(): any {
  const colorScheme = useColorScheme();
  return ColorThemes[colorScheme];
}
