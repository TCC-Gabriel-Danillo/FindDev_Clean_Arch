import { User } from "./users";

export interface Credentials {
  code: string;
  client_id: string;
  client_secret: string;
}

export interface AuthUseCase {
  authenticateGithub: (credentials: Credentials) => Promise<User | undefined>;
}
