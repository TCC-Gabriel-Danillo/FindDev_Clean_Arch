import { AuthResponse } from "./auth";
import { Coords, Position } from "./Position";

export interface User extends AuthResponse {
  position: Position;
}

export interface UserUseCase {
  listUsersByDistance: (location: Coords, distanceInM: number) => Promise<User[]>;
  getUserPosition: () => Promise<Position>;
  createUser: (user: AuthResponse) => Promise<User>;
  updateUser: (user: User) => Promise<void>;
}
