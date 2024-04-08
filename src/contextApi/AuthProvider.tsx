import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<{
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
}>({
  auth: {
    isAuthenticated: false,
    message: "",
    user: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  },
  setAuth: () => {},
});

interface userProps {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
export interface AuthProps {
  isAuthenticated: boolean;
  message: string;
  user: userProps;
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthProps>(() => {
    // Retrieve authentication data from localStorage on component mount
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, message: "" };
  });

  // Update localStorage whenever auth state changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
