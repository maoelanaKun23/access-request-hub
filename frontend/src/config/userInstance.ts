import type {RequestConfig, ResponseConfig} from '@kubb/swagger-client/client'
import type {AxiosError} from 'axios'
import apiConfig from './api'

const BASE_API = ''

export const axiosClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const promise = apiConfig
    .request<TVariables, ResponseConfig<TData>>({
      baseURL: `${import.meta.env.REACT_APP_API_URL_REVAMP}${BASE_API}`,
      ...config,
      headers: {
        Accept: 'application/json',
        'Ocp-Apim-Subscription-Key': import.meta.env
          .REACT_APP_UT_PORTAL_OCP_APIM_KEY,
        ...config.headers,
      },
    })
    .catch((e: AxiosError<TError>) => {
      throw e
    })

  return promise
}

export default axiosClient
