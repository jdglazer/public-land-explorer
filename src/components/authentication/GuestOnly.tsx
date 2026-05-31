import { useUserContext } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

interface GuestOnlyProps {
  children: ReactNode;
}

const GuestOnly = ({ children }: GuestOnlyProps) => {
  const router = useRouter();
  const { user, authChecked } = useUserContext();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/landsmap");
    }
  }, [user, authChecked]);

  if (!authChecked) {
    return <ThemedLoader />;
  }

  return children;
};

export default GuestOnly;
