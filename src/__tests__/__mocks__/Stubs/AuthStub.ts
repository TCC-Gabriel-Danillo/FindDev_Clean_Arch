import { AuthResponse, AuthUseCase, Credentials } from "_/domain/useCase/auth";

export const mockCredentials = { client_id: "CLIENT_ID", client_secret: "SECRET", code: "1234" } as Credentials;

export const mockAuthResponse = {
  id: "1234",
  profileUrl: "URL",
  username: "USER",
  email: "EMAIL",
  photoUrl: "PHOTO_URL",
  techs: ["ANY_TECH_1", "ANY_TECH_2", "ANY_TECH_3"],
} as AuthResponse;

export class AuthServiceStub implements AuthUseCase {
  authenticateGithub = jest.fn((credentials: Credentials) => {
    return Promise.resolve(mockAuthResponse);
  });
}
