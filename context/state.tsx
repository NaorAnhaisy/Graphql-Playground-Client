import { createContext, useContext } from "react";

const AppContext = createContext({});

interface Props {
  children?: React.ReactNode;
}

export function AppWrapper({ children }: Props) {
  let sharedState = {
    /* whatever you want */
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
