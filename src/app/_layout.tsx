import ThemedView from "@/components/ThemedView";
import { UserContextProvider } from "@/contexts/UserContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <UserContextProvider>
      <ThemedView>
        <StatusBar style="auto" />
        <Slot />
      </ThemedView>
    </UserContextProvider>
  );
};

export default RootLayout;
