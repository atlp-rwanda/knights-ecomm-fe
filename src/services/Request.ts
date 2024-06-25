// eslint-disable
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const baseUrl: string = import.meta.env.VITE_APP_API_URL || '';

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60,
  responseType: 'json'
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  // Add any custom configuration options here
}

instance.interceptors.request.use(
  async function (config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Handle success response
const successResponse = <T>(response: AxiosResponse<T>): T => response.data;

// Handle fail response
const failResponse = (error: AxiosError<any>): Promise<any> => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const { status, data } = error.response;
    let errorMessage = 'Request failed with status ' + status;
    if ((data && data.message) || data.error) {
      errorMessage = data.message ?? data.error; // Use the server-provided error message
    }

    return Promise.reject(new Error(errorMessage)); // Reject with the server error message
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Request setup error:', error.message);
  }
  return Promise.reject(error);
};
const Request = <T>(options: CustomAxiosRequestConfig): Promise<T> =>
  instance(options).then(successResponse).catch(failResponse);

export default Request;
