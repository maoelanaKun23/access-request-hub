import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const cancelTokenSource = axios.CancelToken.source();

const apiConfig = axios.create({
  timeout: 310000,
  headers: {
    Accept: "application/json",
  },
});

const requestFulfilled = (config: InternalAxiosRequestConfig) => {
  config.cancelToken = cancelTokenSource.token;
  return config;
};

const requestRejected = (error: AxiosError) => Promise.reject(error);

const responseFulfilled = (res: AxiosResponse) => res;
const responseRejected = async (error: AxiosError) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    localStorage.removeItem(import.meta.env.REACT_APP_CLIENT_ID);
    localStorage.removeItem(import.meta.env.REACT_APP_CLIENT_UT_PORTAL);
    window.location.href = `${import.meta.env.REACT_APP_BASE_DIR}/login`;
  }
  return Promise.reject(error);
};

apiConfig.interceptors.request.use(requestFulfilled, requestRejected);
apiConfig.interceptors.response.use(responseFulfilled, responseRejected);

export default apiConfig;
