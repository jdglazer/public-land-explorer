import UserOnly from "@/components/authentication/UserOnly";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const UserViewsRoot = () => {
  return (
    <UserOnly>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen
          name="datasets"
          options={{ title: getLocalizedText("downloads", "title") }}
        />
        <Tabs.Screen
          name="landsmap"
          options={{ title: getLocalizedText("landsmap", "title") }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: getLocalizedText("settings", "title") }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default UserViewsRoot;
