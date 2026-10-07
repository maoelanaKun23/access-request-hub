import type { RequestConfig, ResponseConfig } from '@kubb/swagger-client/client'
import type { AxiosError } from 'axios'
import apiConfig from './api'

export const client = async <
  TData,
  TError = unknown,
  TVariables = unknown
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  try {
    const response = await apiConfig.request<TVariables, ResponseConfig<TData>>({
      baseURL: `${import.meta.env.REACT_APP_API_URL_REVAMP}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ...config.headers,
      },
      ...config,
    })

    return response
  } catch (error: unknown) {
    throw error as AxiosError<TError>
  }
}

export default client
