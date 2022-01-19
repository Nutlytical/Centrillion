import React, { createContext, PropsWithChildren, useState } from "react";

interface AuthContextType {
  auth: User | null;
  setAuth: (auth: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
