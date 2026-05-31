import { account } from "@/constants/dataaccess/appwrite";
import { ID } from "appwrite";
import { createContext, ReactNode, useEffect, useState } from "react";

export const UserContext = createContext({} as any);

export interface UserType {
  email: string;
  password: string;
  name: string;
  $id: string;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null as UserType | null);
  const [authChecked, setAuthChecked] = useState(false);
  console.log("authChecked", authChecked, "user", user);

  async function register(name: string, email: string, password: string) {
    const userData = { name, email, password, userId: ID.unique() };
    try {
      await account.create(userData);
      await login(email, password);
    } catch (error) {
      console.error("Error registering user:", error);
      setUser(null);
    }
  }

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({
        email: email,
        password: password,
      });
      await fetchUser();
    } catch (error) {
      console.error("Error logging in user:", error);
      setUser(null);
    }
  }

  async function fetchUser() {
    try {
      const userLoggedIn = (await account.get()) as UserType;
      setUser(userLoggedIn);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }

  async function initialAuthCheck() {
    if (authChecked) return;
    await fetchUser();
    setAuthChecked(true);
  }

  async function logout() {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.error("Error logging out user:", error);
    } finally {
      setUser(null);
    }
  }

  /* Chargement initial pour vérifier l'état d'authentification */
  useEffect(() => {
    initialAuthCheck();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, authChecked, register, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}
