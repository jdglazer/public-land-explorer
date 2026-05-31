import LocalizedText from "@/components/LocalizedText";
import ThemedButton from "@/components/ThemedButton";
import ThemedForm from "@/components/ThemedForm";
import ThemedLink from "@/components/ThemedLink";
import ThemedTextInput from "@/components/ThemedTextInput";
import { getLocalizedText } from "@/hooks/getLocalizedText";
import { useUserContext } from "@/hooks/useUser";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // error/success state
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const userContext = useUserContext();

  const handleRegister = async () => {
    await userContext.register(username, email, password);
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    console.log("setting message");
    setMessage(getLocalizedText("register", "registrationSuccessMsg"));
    setError(false);
  };

  return (
    <ThemedForm
      error={error}
      message={message}
      duration={15000}
      setMessage={setMessage}
    >
      <ThemedTextInput
        placeholder={getLocalizedText("register", "username")}
        value={username}
        onChangeText={setUsername}
      />
      <ThemedTextInput
        placeholder={getLocalizedText("register", "email")}
        value={email}
        onChangeText={setEmail}
      />
      {/* À faire: afficher les conditions de mot de passe */}
      <ThemedTextInput
        placeholder={getLocalizedText("register", "password")}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <ThemedTextInput
        placeholder={getLocalizedText("register", "confirmPassword")}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <ThemedButton
        text={getLocalizedText("register", "action")}
        onPress={handleRegister}
        disabled={
          !email ||
          !email.includes("@") ||
          !username ||
          !password ||
          password !== confirmPassword
        }
      />
      {/* À faire: choisir des conditions plus strictes, afficher un message
      d'erreur */}
      <ThemedLink href="/login">
        <LocalizedText component="register" identifier="haveaccount" />
      </ThemedLink>
    </ThemedForm>
  );
};

export default Register;
