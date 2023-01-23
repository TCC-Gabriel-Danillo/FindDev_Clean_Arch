import React, { createContext } from "react";
import { Alert } from "react-native";

import { STORAGE_KEYS } from "../constants";
import { UsersService } from "_/data/usecases/UsersService";
import { AuthResponse } from "_/domain/useCase/auth";
import { Coords, Position } from "_/domain/useCase/position";
import { User } from "_/domain/useCase/users";
import { LocalStorageType } from "_/data/protocols/cache/localStorage";
import { usePersistentState } from "../hooks/usePersistentState";

const DISTANCE_IN_METERS = 10000;

interface IUserContext {
  createUser: (authedUser: AuthResponse) => Promise<void>;
  listUsers: (coords: Coords) => Promise<User[]>;
}

interface UserContextProps {
  children?: JSX.Element;
  userService: UsersService;
  localStorage: LocalStorageType;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextProvider({ children, userService, localStorage }: UserContextProps) {
  const { setPersistentState } = usePersistentState(STORAGE_KEYS.USERS, localStorage, {});

  const createUser = async (authedUser: AuthResponse): Promise<void> => {
    try {
      const user = await userService.createUser(authedUser);
      setPersistentState(user);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  };

  const listUsers = async (coords: Coords) => {
    const users = await userService.listUsersByDistance(coords, DISTANCE_IN_METERS);
    return users;
  };

  return <UserContext.Provider value={{ createUser, listUsers }}>{children}</UserContext.Provider>;
}
