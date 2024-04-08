import { useContext } from "react";
import { AuthContext } from "../contextApi/AuthProvider";

export default function useAuth() {
  const { auth, setAuth } = useContext(AuthContext);

  return {
    auth,
    setAuth,
  };
}
