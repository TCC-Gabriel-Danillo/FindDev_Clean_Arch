import { AuthResponse } from "./auth";
import { Position } from "./Position";

export interface User extends AuthResponse {
  position: Position;
}
