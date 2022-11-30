import { ApiService } from "../../ApiService";

export class TokenApi {
  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await ApiService.post<
      {
        email: string;
        password: string;
      },
      {
        accessToken: string;
        refreshToken: string;
      }
    >({ url: "/v1/authorization/login", data: { email, password } });

    return response;
  }

  static async refresh({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<{ accessToken: string }> {
    const response = await ApiService.post<
      { refreshToken: string },
      { accessToken: string }
    >({
      url: "/v1/authorization/refresh",
      data: { refreshToken },
    });

    return response;
  }

  static async revoke({ accessToken }: { accessToken: string }): Promise<void> {
    await ApiService.post<{ accessToken: string }>({
      url: "/v1/authorization/revoke",
      data: { accessToken },
    });
  }
}
