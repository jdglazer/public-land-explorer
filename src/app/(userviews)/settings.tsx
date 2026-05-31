import LocalizedText from "@/components/LocalizedText";
import ThemedButton from "@/components/ThemedButton";
import ThemedView from "@/components/ThemedView";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { useUserContext } from "@/hooks/useUser";
import React from "react";

const Settings = () => {
  const { logout } = useUserContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ThemedView>
      <LocalizedText component="settings" identifier="title" />
      <ThemedButton
        text={getLocalizedText("settings", "logout")}
        onPress={handleLogout}
        disabledOnPress={true}
      />
    </ThemedView>
  );
};

export default Settings;
