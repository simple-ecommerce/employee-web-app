import { ApiService } from "../../ApiService";

export class TokenApi {
  static async login({
    companyId,
    email,
    password,
  }: {
    email: string;
    password: string;
    companyId: number;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await ApiService.post<
      {
        email: string;
        password: string;
        companyId: number;
      },
      {
        accessToken: string;
        refreshToken: string;
      }
    >({ url: "/v1/authorization/login", data: { companyId, email, password } });

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
