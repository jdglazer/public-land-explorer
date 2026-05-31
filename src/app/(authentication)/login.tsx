import LocalizedText from "@/components/LocalizedText";
import ThemedButton from "@/components/ThemedButton";
import ThemedLink from "@/components/ThemedLink";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { useUserContext } from "@/hooks/useUser";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useUserContext();

  const handleLogin = async () => {
    console.log("Logging in...");
    await userContext.login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <ThemedView>
      <ThemedTextInput
        placeholder={getLocalizedText("login", "email")}
        value={email}
        onChangeText={setEmail}
      />
      <ThemedTextInput
        placeholder={getLocalizedText("login", "password")}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <ThemedButton
        text={getLocalizedText("login", "action")}
        onPress={handleLogin}
        disabled={!email || !password}
      />
      <ThemedLink href="/register">
        <LocalizedText component="login" identifier="noaccount" />
      </ThemedLink>
    </ThemedView>
  );
};

export default Login;
