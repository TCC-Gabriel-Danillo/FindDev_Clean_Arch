interface HttpsClientType {
  get: <T>(endpoint: string, config?: any, params?: Record<string, any>) => Promise<T | undefined>;
  post: <T>(endpoint: string, data: Record<string, any>, config?: any) => Promise<T | undefined>;
}
