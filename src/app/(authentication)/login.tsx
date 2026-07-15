import ThemedView from "@/components/ThemedView";
import { useUserContext } from "@/hooks/useUserContext";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

const Login = () => {

  const userContext = useUserContext();

  return (
    <ThemedView>
      <GoogleSigninButton onPress={userContext.loginGoogle} />
    </ThemedView>
  );
};

export default Login;
