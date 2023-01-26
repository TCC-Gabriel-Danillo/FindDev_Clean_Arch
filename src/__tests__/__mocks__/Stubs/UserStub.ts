import { AuthResponse } from "_/domain/useCase/auth";
import { Coords, Position } from "_/domain/useCase/position";
import { User, UserUseCase } from "_/domain/useCase/users";
import { mockAuthResponse } from "./AuthStub";
import { mockPosition } from "./LocationStub";

const mockUser = {
  id: "5431",
  position: mockPosition,
  profileUrl: "URL",
  username: "USER",
  email: "EMAIL",
  photoUrl: "PHOTO",
  techs: ["ANY_TECH1"],
} as User;

export const mockCurrentUser = {
  ...mockAuthResponse,
  position: mockPosition,
} as User;

export class UserStub implements UserUseCase {
  listUsersByDistance = jest.fn((location: Coords, distanceInM: number) => {
    return Promise.resolve([{ ...mockUser, position: { ...mockUser.position, location } }]);
  });

  createAndUpdateUser = jest.fn((user: AuthResponse) => {
    return Promise.resolve({ ...user, position: mockPosition });
  });
}
