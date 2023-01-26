jest.mock("_/presentation/hooks/useAuthPrompt", () => ({
  useAuthPrompt: () => ({
    promptAuth: async () =>
      Promise.resolve({
        code: "1234",
        client_id: "client_id",
        client_secret: "client_secret",
      }),
  }),
}));
