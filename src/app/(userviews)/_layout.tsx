import { getLocalizedText } from "@/hooks/getLocalizedText";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import UserOnly from "@/components/authentication/UserOnly";
import { COLORS } from "@/constants/styles/ColorThemes";

const UserViewsRoot = () => {
  return (
    <UserOnly>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: false, tabBarInactiveTintColor: COLORS.text, tabBarActiveTintColor: COLORS.accent, tabBarStyle: {height: 72, backgroundColor: COLORS.primary} }}>
        <Tabs.Screen
          name="landsmap"
          options={{ title: getLocalizedText("landsmap", "title"),
            tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />
           }}
        />
        <Tabs.Screen
          name="datasets"
          options={{ title: getLocalizedText("downloads", "title"),
            tabBarIcon: ({ color, size }) => <Ionicons name="download-outline" size={size} color={color} />
           }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: getLocalizedText("settings", "title"),
            tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />
           }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default UserViewsRoot;
