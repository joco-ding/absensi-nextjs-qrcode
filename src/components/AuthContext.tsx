import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AuthContextProps {
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  login: () => {},
  logout: () => {},
});


interface AuthProps {
  children: ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  const login = (role: string) => setRole(role);
  const logout = () => setRole(null);

  const contextValue = useMemo(() => ({role, login, logout}), [role])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
