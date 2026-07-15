
import { createContext, ReactNode, useEffect, useState } from "react";

import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
  User
} from '@react-native-google-signin/google-signin';

import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({} as any);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null as User | null);
  const [authChecked, setAuthChecked] = useState(false);

  async function configure() {
    GoogleSignin.configure({webClientId: '55143554149-112h9vfcjg97b46cfuerbffg038erjjj.apps.googleusercontent.com'}); // Replace with your
  }

  async function loginGoogle() {
    try {
      // will prompt user to update play if it's out of date
      console.log("loginGoogle:", "Checking for Google Play Services...");
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      console.log("loginGoogle:", "Signing in with Google...");
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log("loginGoogle:", "Sign-in successful. User info:", response.data);
        saveUser(response.data);
      } else {
        console.log("loginGoogle:", "Sign-in cancelled. Response:", response);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("loginGoogle:", "User cancelled the login flow.");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("loginGoogle:", "Play services not available or outdated.");
            break;
          default:
            console.error("loginGoogle:", "An unknown error occurred during sign-in:", error);
            console.log("loginGoogle:", "Error details:", error.message, error.stack);
            console.log(error.code);
        }
      } else {
        console.error("Error signing in:", error);
      }
    }
  }

  async function fetchUser() {
    if (GoogleSignin.hasPreviousSignIn()) {
      
      console.log("fetchUser:", "Previous sign-in detected. Attempting to fetch user...");

      const user = GoogleSignin.getCurrentUser();
      if (user !== null) {
        saveUser(user);
        return;
      }

      console.log("fetchUser:", "No current user found. Attempting silent sign-in...");
      try {
        const user = await silentSignIn();
        saveUser(user);
      } catch (error) {
        console.error("fetchUser:", "Error occurred while attempting silent sign-in:", error);
      }
    }
  }

  async function silentSignIn() {
    const response = await GoogleSignin.signInSilently();
    if (response.type === "success") {
      console.log("fetchUser:", "Silent sign-in successful. User fetched:", response.data);
    } else if (response.type === "noSavedCredentialFound") {
      console.log("fetchUser:", "Silent sign-in failed. No saved credentials found.");
    }
    return response.data;
  }

  function saveUser(user: User|null) {
    if (user === null) return;
    user.idToken = null; // we do not need to store the idToken with the user in memory
    console.log("saveUser:", "Saving user to state:", user);
    setUser(user);
  }

  async function initialAuthCheck() {
    if (authChecked) return;
    await configure();
    await fetchUser();
    setAuthChecked(true);
  }

  async function logoutGoogle() {
    try {
       await GoogleSignin.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setUser(null);
    }
  }

  async function getIdToken() {
    try {
        const tokenResponse = await GoogleSignin.getTokens();
        const decodedToken = jwtDecode(tokenResponse.idToken);

        const timeNow = Date.now() / 1000; // Current time in seconds

        decodedToken.exp = decodedToken.exp || 0; // Ensure exp is defined
        if (decodedToken.exp < (timeNow + 60)) {
          // refresh the token if it's about to expire in the next 60 seconds
          console.log("ID token is about to expire or has expired. Refreshing...");
          const user = await silentSignIn();
          return user?.idToken;
        }

        return tokenResponse.idToken;
    } catch (error) {
      console.error("Error fetching ID token:", error);
    }
    return null;
  }

  /* Chargement initial pour vérifier l'état d'authentification */
  useEffect(() => {
    configure();
    initialAuthCheck();
  }, []);

  
  return (
    <UserContext.Provider
      value={{ user, authChecked, loginGoogle, logoutGoogle, getIdToken }}>
      {children}
    </UserContext.Provider>
  );
}
