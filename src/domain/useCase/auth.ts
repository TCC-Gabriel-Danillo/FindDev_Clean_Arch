export interface Credentials {
  code: string;
  client_id: string;
  client_secret: string;
}

export interface AuthUseCase {
  authenticateGithub: (credentials: Credentials) => Promise<AuthResponse | undefined>;
}

export interface AuthResponse {
  id: string;
  username: string;
  profileUrl: string;
  photoUrl?: string;
  email?: string;
  techs?: Array<string>;
}
