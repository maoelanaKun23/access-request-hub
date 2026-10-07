import type { RequestConfig, ResponseConfig } from "@kubb/swagger-client/client";
import type { AxiosError } from "axios";
import apiConfig from "./api";

export const absensiClient = async <
  TData,
  TError = unknown,
  TVariables = unknown
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  try {
    const response = await apiConfig.request<TVariables, ResponseConfig<TData>>(
      {
        baseURL: import.meta.env.VITE_API_URL || "https://backend-absensi-sd-warakas-01.vercel.app/api",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ...config.headers,
        },
        ...config,
      }
    );

    return response;
  } catch (error: unknown) {
    throw error as AxiosError<TError>;
  }
};

export default absensiClient;