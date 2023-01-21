export interface User {
  id: string;
  username: string;
  profileUrl: string;
  photoUrl?: string;
  email?: string;
  techs?: Array<string>;
}
