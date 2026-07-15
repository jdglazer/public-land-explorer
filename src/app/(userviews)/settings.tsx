import LocalizedText from "@/components/LocalizedText";
import ThemedButton from "@/components/ThemedButton";
import ThemedView from "@/components/ThemedView";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { useUserContext } from "@/hooks/useUserContext";
import React from "react";

const Settings = () => {
  const { logoutGoogle} = useUserContext();

  const handleLogout = async () => {
    await logoutGoogle();
  };

  return (
    <ThemedView>
      <LocalizedText component="settings" identifier="title" />
      <ThemedButton onPress={handleLogout} text={getLocalizedText("settings", "logout")} />
    </ThemedView>
  );
};

export default Settings;
