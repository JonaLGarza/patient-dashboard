import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Base URL configuration interface
interface BaseUrlConfig {
  ZAINAR: string;
  // Add other providers as needed
}

// Base URLs loaded from environment variables or constants
const BaseUrlConfig: BaseUrlConfig = {
  ZAINAR: import.meta.env.VITE_API_URL,
  // Add other providers and their URLs here
};

/**
 * Creates an Axios instance with default configurations.
 */
const axiosInstance: AxiosInstance = axios.create({
  // we can set default configurations here if needed
});

/**
 * Request interceptor to add authentication tokens and custom headers.
 */
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // Add authentication token to headers if exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // we can add more custom request configurations here

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Response interceptor to handle global response errors.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired. Handle refresh token logic here.");
      // Optionally, implement token refresh logic or redirect to login
    }
    return Promise.reject(error);
  }
);

/**
 * API Client with methods for making HTTP requests.
 */
const apiClient = {
  /**
   * Retrieves the base URL for the specified provider.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {string} - The base URL string.
   */
  getBaseUrl(provider: keyof BaseUrlConfig): string {
    const baseUrl = BaseUrlConfig[provider];
    if (!baseUrl) {
      throw new Error(`Base URL for provider "${provider}" is not defined.`);
    }
    return baseUrl;
  },

  /**
   * Constructs headers for the request, allowing for custom headers.
   * @param {any} [customHeaders={}] - Custom headers to include in the request.
   * @returns {Record<string, string>} - An object containing the headers.
   */
  _getHeaders(customHeaders: any = {}): Record<string, string> {
    const token = localStorage.getItem("token");
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    };
  },

  /**
   * Handles the API request and processes the response or error.
   * @template T - The expected response data type.
   * @param {AxiosRequestConfig} config - The Axios request configuration.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  async _handleRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance.request<T>(config);
      return this._handleSuccess(response);
    } catch (error) {
      return this._handleError<T>(error);
    }
  },

  /**
   * Processes a successful response.
   * @template T - The expected response data type.
   * @param {AxiosResponse<T>} response - The Axios response object.
   * @returns {T} - The response data.
   */
  _handleSuccess<T>(response: AxiosResponse<T>): T {
    return response.data;
  },

  /**
   * Processes an error response.
   * @template T - The expected response data type.
   * @param {any} error - The error object.
   * @returns {Promise<never>} - A rejected promise with error information.
   */
  _handleError<T>(error: any): Promise<never> {
    console.error("API Error:", error);

    // Optionally, we can process specific error cases here

    return Promise.reject({
      success: false,
      errorMessage: error.message || "An error occurred",
      // Include additional error information if needed
    });
  },

  /**
   * General method for making HTTP requests.
   * @template T - The expected response data type.
   * @param {"get" | "post" | "put" | "delete"} method - The HTTP method.
   * @param {string} url - The endpoint URL.
   * @param {any} [data=null] - The request payload.
   * @param {AxiosRequestConfig} [options={}] - Optional Axios request configuration.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  _request<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data: any = null,
    options: AxiosRequestConfig = {},
    provider: keyof BaseUrlConfig
  ): Promise<T> {
    const fullUrl = this.getBaseUrl(provider) + url;
    const isFormData = data instanceof FormData;

    const headers = this._getHeaders({
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...options.headers,
    });

    const config: AxiosRequestConfig = {
      method,
      url: fullUrl,
      data,
      timeout: 15000,
      headers,
      ...options,
    };

    return this._handleRequest<T>(config);
  },

  /**
   * Performs a GET request.
   * @template T - The expected response data type.
   * @param {string} url - The endpoint URL.
   * @param {AxiosRequestConfig} [options={}] - Optional Axios request configuration.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  get<T>(url: string, options: AxiosRequestConfig = {}, provider: keyof BaseUrlConfig): Promise<T> {
    return this._request<T>("get", url, null, options, provider);
  },

  /**
   * Performs a POST request.
   * @template T - The expected response data type.
   * @param {string} url - The endpoint URL.
   * @param {any} data - The request payload.
   * @param {AxiosRequestConfig} [options={}] - Optional Axios request configuration.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  post<T>(url: string, data: any, options: AxiosRequestConfig = {}, provider: keyof BaseUrlConfig): Promise<T> {
    return this._request<T>("post", url, data, options, provider);
  },

  /**
   * Performs a PUT request.
   * @template T - The expected response data type.
   * @param {string} url - The endpoint URL.
   * @param {any} data - The request payload.
   * @param {AxiosRequestConfig} [options={}] - Optional Axios request configuration.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  put<T>(url: string, data: any, options: AxiosRequestConfig = {}, provider: keyof BaseUrlConfig): Promise<T> {
    return this._request<T>("put", url, data, options, provider);
  },

  /**
   * Performs a DELETE request.
   * @template T - The expected response data type.
   * @param {string} url - The endpoint URL.
   * @param {AxiosRequestConfig} [options={}] - Optional Axios request configuration.
   * @param {keyof BaseUrlConfig} provider - The base URL provider key.
   * @returns {Promise<T>} - A promise that resolves to the response data.
   */
  delete<T>(url: string, options: AxiosRequestConfig = {}, provider: keyof BaseUrlConfig): Promise<T> {
    return this._request<T>("delete", url, null, options, provider);
  },
};

export default apiClient;
