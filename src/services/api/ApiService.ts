import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ObjectHelpers } from "../../helpers/object_helpers/objectHelpers";
import { AuthStore } from "../stores/auth/AuthStore";
import { TokenApi } from "./authentication/clients/TokenApi";

const TOKEN = "ecommerce.token";
const REFRESH_TOKEN = "ecommerce.refresh_token";

const isRefreshingToken = Symbol("isRefreshingToken");
const pendingRequestsQueue = Symbol("pendingRequestsQueue");
const startApiClient = Symbol("startApiClient");
const handleCookiesOnRequest = Symbol("handleCookiesOnRequest");
const handleObjectFieldsOnRequest = Symbol("handleObjectFieldsOnRequest");
const handleObjectFieldsOnResponse = Symbol("handleObjectFieldsOnResponse");
const handleErrorOnResponse = Symbol("handleErrorOnResponse");
const handleTokenRefresh = Symbol("handleTokenRefresh");
const handleTokenRefreshError = Symbol("handleTokenRefreshError");

export class ApiService {
  static [isRefreshingToken] = false;
  static [pendingRequestsQueue]: AxiosRequestConfig<any>[] = [];
  static readonly client = ApiService[startApiClient]();

  private constructor() {}

  static async get<Response, Params = unknown>({
    url,
    params,
  }: {
    url: string;
    params?: Params;
  }): Promise<Response> {
    const response = await ApiService.client.get<Response>(url, { params });
    return response.data;
  }

  static async post<Data, Response = void, Params = unknown>({
    url,
    data,
    params,
  }: {
    data?: Data;
    params?: Params;
    url: string;
  }): Promise<Response> {
    const reponse = await ApiService.client.post<Response>(url, data, {
      params,
    });
    return reponse?.data;
  }

  static async patch<Data, Response = void, Params = unknown>({
    url,
    data,
    params,
  }: {
    data?: Data;
    params?: Params;
    url: string;
  }): Promise<Response> {
    return (await ApiService.client.patch<Response>(url, data, { params }))
      .data;
  }

  static async put<Data, Response = void, Params = unknown>({
    url,
    data,
    params,
  }: {
    data?: Data;
    params?: Params;
    url: string;
  }): Promise<Response> {
    return (await ApiService.client.put<Response>(url, data, { params })).data;
  }

  static async delete<Response = void, Params = unknown>({
    url,
    params,
  }: {
    params?: Params;
    url: string;
  }): Promise<Response> {
    return (await ApiService.client.delete<Response>(url, { params })).data;
  }

  static [startApiClient]() {
    const client = axios.create({
      baseURL: import.meta.env.VITE_PUBLIC_API_URL ?? "",
    });

    client.interceptors.request.use(ApiService[handleCookiesOnRequest] as any);
    client.interceptors.request.use(ApiService[handleObjectFieldsOnRequest]);

    client.interceptors.response.use(
      ApiService[handleObjectFieldsOnResponse],
      ApiService[handleErrorOnResponse]
    );

    return client;
  }

  static [handleCookiesOnRequest](request: AxiosRequestConfig<any>) {
    const cookies = parseCookies();

    return {
      ...request,
      headers: {
        ...request.headers,
        common: {
          ["Authorization"]: `Bearer ${cookies[TOKEN]}`,
        },
      },
    };
  }
  static [handleObjectFieldsOnRequest](request: AxiosRequestConfig<any>) {
    return {
      ...request,
      params: ObjectHelpers.toSnakeCase(request.params),
      data: ObjectHelpers.toSnakeCase(request.data),
    };
  }

  static [handleObjectFieldsOnResponse](response: AxiosResponse<any, any>) {
    return {
      ...response,
      data: ObjectHelpers.toCamelCase(response.data),
    };
  }

  static async [handleErrorOnResponse](error: AxiosError) {
    if (error.response?.status === 401) {
      return ApiService[handleTokenRefresh](error);
    }
    return Promise.reject(error);
  }

  static async [handleTokenRefresh](error: AxiosError) {
    if (!ApiService[isRefreshingToken]) {
      ApiService[isRefreshingToken] = true;
      const cookies = parseCookies();
      const refreshToken = cookies[REFRESH_TOKEN];
      try {
        const { accessToken } = await TokenApi.refresh({
          refreshToken,
        });
        const newAuthorization = `Bearer ${accessToken}`;

        setCookie(undefined, TOKEN, accessToken, {
          path: "/",
        });

        ApiService.client.defaults.headers.common.Authorization =
          newAuthorization;
        ApiService[isRefreshingToken] = false;
      } catch (tokenRefreshError) {
        ApiService[handleTokenRefreshError]();

        return tokenRefreshError;
      }
    }
  }

  static [handleTokenRefreshError]() {
    destroyCookie(undefined, TOKEN, { path: "/" });
    destroyCookie(undefined, REFRESH_TOKEN, { path: "/" });
    // ProvidersPartialLogic.queryClient.clear();
    AuthStore.set.isAuthenticated(false);
  }
}
