import { useUserContext } from "@/hooks/useUser";
import { Redirect } from "expo-router";
import { ReactNode } from "react";
import ThemedLoader from "../ThemedLoader";

interface UserOnlyProps {
  children: ReactNode;
}

const UserOnly = ({ children }: UserOnlyProps) => {
  const { user, authChecked } = useUserContext();

  if (authChecked && user === null) {
    return <Redirect href="/login" />;
  }

  if (!authChecked && !user) {
    return <ThemedLoader />;
  }

  return children;
};

export default UserOnly;
