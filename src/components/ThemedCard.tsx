import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export interface ThemedCardProps {
  children: ReactNode;
  theme: "success" | "error";
  [key: string]: any;
}

const ThemedCard = ({ children, theme, ...props }: ThemedCardProps) => {
  return (
    <View
      style={[
        styles.container,
        theme === "success" ? styles.containerSuccess : styles.containerError,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  containerSuccess: {
    backgroundColor: "#a6f5b1",
    borderColor: "#0b941d",
    color: "#065e12",
  },
  containerError: {
    backgroundColor: "#f6aea3",
    borderColor: "#d1290f",
    color: "#B81F07",
  },
});
