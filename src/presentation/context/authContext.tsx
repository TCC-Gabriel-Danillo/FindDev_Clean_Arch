import React, { createContext } from "react";
import { STORAGE_KEYS } from "../constants";
import { AuthResponse, AuthUseCase, Credentials } from "_/domain/useCase/auth";
import { LocalStorageType } from "_/data/protocols/cache/localStorage";
import { User } from "_/domain/useCase/users";
import { usePersistentState } from "../hooks/usePersistentState";

interface AuthContextProviderProps {
  children?: JSX.Element;
  authService: AuthUseCase;
  localStorage: LocalStorageType;
}

interface IAuthContext {
  signInWithGithub: (promptAuth: () => Promise<Credentials>) => Promise<AuthResponse | undefined>;
  isUserAuthenticated: boolean;
  signOut: () => void;
  user?: User;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children, authService, localStorage }: AuthContextProviderProps) => {
  const { value: user, setPersistentState } = usePersistentState<User>(STORAGE_KEYS.USERS, localStorage);

  const signInWithGithub = async (promptAuth: () => Promise<Credentials>) => {
    const credentials = await promptAuth();
    const authUser = authService.authenticateGithub(credentials);

    return authUser;
  };

  const signOut = () => {
    setPersistentState({} as User);
  };

  return (
    <AuthContext.Provider value={{ signInWithGithub, isUserAuthenticated: !!user?.id, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
