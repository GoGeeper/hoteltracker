import React, { createContext, useState, useEffect } from "react";

export const RegisterContext = createContext<{
  registered: RegisterProps[] | [];
  setRegister: React.Dispatch<React.SetStateAction<RegisterProps[] | []>>;
}>({
  registered: [],
  setRegister: () => {},
});

interface RegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  username: string;
  id: string;
}

const RegisterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [registered, setRegister] = useState<RegisterProps[] | []>(() => {
    const savedData = localStorage.getItem("registeredData");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("registeredData", JSON.stringify(registered));
  }, [registered]);

  return (
    <RegisterContext.Provider value={{ registered, setRegister }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
