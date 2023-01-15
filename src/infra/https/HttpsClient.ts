import axios, { AxiosError, AxiosInstance } from "axios";
import { ErrorFromRes, ServerError } from "_/domain/error";

const headers = {
  "Content-Type": "application/json",
};

export class HttpsClient implements HttpsClientType {
  private api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers,
    });
  }

  get = async <T>(endpoint: string, config?: any, params?: Record<string, any>) => {
    try {
      const response = await this.api.get(endpoint, { ...config, params });
      return response.data as T;
    } catch (error) {
      if (error instanceof AxiosError) throw this.handleAxiosError(error);
      throw new ServerError();
    }
  };

  post = async <T>(endpoint: string, data: Record<string, any>, config?: any) => {
    try {
      const response = await this.api.post(endpoint, data, { ...config });
      return response.data as T;
    } catch (error) {
      if (error instanceof AxiosError) throw this.handleAxiosError(error);
      throw new ServerError();
    }
  };

  private handleAxiosError(error: AxiosError<any, any>) {
    const { status, message } = error;
    const errorFromRes = ErrorFromRes(status, message);
    if (errorFromRes) return errorFromRes;
    return new ServerError(message);
  }
}
