import { ReactNode, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import ThemedCard from "./ThemedCard";
import ThemedView from "./ThemedView";

interface ThemedFormProps {
  children: ReactNode;
  error: boolean;
  duration: number;
  message: string;
  setMessage: (msg: string) => void;
}

const ThemedForm = ({
  children,
  error,
  message,
  duration,
  setMessage,
}: ThemedFormProps) => {
  let showmessage = message !== "";

  if (showmessage) {
    useEffect(() => {
      setTimeout(() => {
        setMessage("");
      }, duration);
    }, []);
  }
  console.log("showmessage", showmessage);
  return (
    <>
      {children}
      {showmessage && (
        <ThemedView style={styles.snackbarContainer}>
          <ThemedCard theme={error ? "error" : "success"}>
            <Text>{message}</Text>
          </ThemedCard>
        </ThemedView>
      )}
    </>
  );
};

export default ThemedForm;

const styles = StyleSheet.create({
  snackbarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
