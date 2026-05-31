import GuestOnly from "@/components/authentication/GuestOnly";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { Stack } from "expo-router";
import React from "react";

const AuthRoot = () => {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: true, headerBackVisible: false }}>
        <Stack.Screen
          name="login"
          options={{ title: getLocalizedText("login", "title") }}
        />
        <Stack.Screen
          name="register"
          options={{ title: getLocalizedText("register", "title") }}
        />
      </Stack>
    </GuestOnly>
  );
};

export default AuthRoot;
