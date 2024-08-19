import { login, logout, onUserStateChange } from 'api/firebase';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type User = {
  accessToken: string;
  auth: object;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: object;
  phoneNumber: any;
  photoURL: string;
  proactiveRefresh: object;
  providerData: Array<any>;
  providerId: string;
  reloadListener: any;
  reloadUserInfo: object;
  photoUrl: string;
  stsTokenManager: object;
  expirationTime: number;
  tenantId: any;
  uid: string;
  refreshToken: any;
  isAdmin: boolean;
};

interface AuthContextType {
  user: User | undefined;
  uid: string | undefined;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    onUserStateChange((user: User | null) => {
      setUser(user || undefined);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user?.uid, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}
