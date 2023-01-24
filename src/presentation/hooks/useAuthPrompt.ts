import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Credentials } from "_/domain/useCase/auth";
import {
  APP_SCHEME,
  GIT_AUTHORIZATION_ENDPOINT,
  GIT_CLIENT_ID,
  GIT_CLIENT_SECRET,
  GIT_REVOCATION_ENDPOINT,
  GIT_TOKEN_ENDPOINT,
} from "../constants/secrets";

const discovery = {
  authorizationEndpoint: GIT_AUTHORIZATION_ENDPOINT,
  tokenEndpoint: GIT_TOKEN_ENDPOINT,
  revocationEndpoint: GIT_REVOCATION_ENDPOINT,
};

export interface AuthPromptService {
  promptAuth: () => Promise<Credentials>;
}

export function useAuthPrompt(): AuthPromptService {
  const [, , promptAsync] = useAuthRequest(
    {
      clientId: GIT_CLIENT_ID,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: APP_SCHEME,
      }),
    },
    discovery
  );

  const promptAuth = async (): Promise<Credentials> => {
    const promptResponse = await promptAsync();
    if (promptResponse.type !== "success") throw new Error("Algo deu errado ao tentar logar.");
    const { code } = promptResponse.params;

    return {
      client_id: GIT_CLIENT_ID,
      client_secret: GIT_CLIENT_SECRET,
      code,
    };
  };

  return { promptAuth };
}
