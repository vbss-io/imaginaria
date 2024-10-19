import { useContext } from "react";

import { AuthContext } from "@/presentation/contexts/auth-context";

export const useAuth = () => {
  return useContext(AuthContext);
};
