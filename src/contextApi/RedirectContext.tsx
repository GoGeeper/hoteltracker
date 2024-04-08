import { createContext, ReactNode, useState } from "react";

export const RedirectContext = createContext<{
  activate: activateProps;
  setActivate: React.Dispatch<React.SetStateAction<activateProps>>;
}>({
  activate: { type: "login", activate: false },
  setActivate: () => {},
});
interface activateProps {
  type: string;
  activate: boolean;
}

const RedirectContextProvider = ({ children }: { children: ReactNode }) => {
  const [activate, setActivate] = useState<activateProps>({
    type: "login",
    activate: false,
  });
  return (
    <RedirectContext.Provider value={{ activate, setActivate }}>
      {children}
    </RedirectContext.Provider>
  );
};
export default RedirectContextProvider;
