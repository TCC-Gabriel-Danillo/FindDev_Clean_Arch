import { AuthUseCase, Credentials } from "_/domain/useCase/auth";
import { GitRepository, GitToken, GitUser } from "../protocols/dto/github";

export class AuthService implements AuthUseCase {
  private gitApi: HttpsClientType;
  private gitAuth: HttpsClientType;

  constructor(gitApi: HttpsClientType, gitAuth: HttpsClientType) {
    this.gitApi = gitApi;
    this.gitAuth = gitAuth;
  }

  public async authenticateGithub(credentials: Credentials) {
    const tokenResponse = await this.exchangeCredentials(credentials);
    if (!tokenResponse) return;

    const { access_token } = tokenResponse;

    const [gitUser, gitRepos] = await Promise.all([this.getUserInfo(access_token), this.getUserRepos(access_token)]);

    if (!gitUser || !gitRepos) return;

    const techs = this.getTechsInfoFromGitRepos(gitRepos);

    return {
      id: String(gitUser.id),
      profileUrl: gitUser.html_url,
      username: gitUser.login,
      email: gitUser.email,
      photoUrl: gitUser.avatar_url,
      techs,
    };
  }

  private async exchangeCredentials(credentials: Credentials) {
    return this.gitAuth.post<GitToken>("/access_token", credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  private async getUserInfo(token: string): Promise<GitUser | undefined> {
    return this.gitApi.get<GitUser>("/user", {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  private async getUserRepos(token: string): Promise<GitRepository[] | undefined> {
    return this.gitApi.get<GitRepository[]>("/user/repos", {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  private getTechsInfoFromGitRepos(repos: GitRepository[]): string[] {
    const techs: Array<string> = [];
    repos.forEach((repo) => {
      const isNewTech = !techs.find((tech) => repo.language == tech);
      if (isNewTech && repo.language) {
        techs.push(repo.language);
      }
    });
    return techs;
  }
}
