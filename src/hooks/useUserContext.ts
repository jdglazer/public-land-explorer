import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export function useUserContext() {
  return useContext(UserContext);
}
