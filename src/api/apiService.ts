// apiService.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";

interface BaseUrlConfig {
  LIGHTEDGE: string | undefined;
  CONNECTRIA: string | undefined;
}

const BaseUrlConfig: BaseUrlConfig = {
  LIGHTEDGE: process.env.NEXT_PUBLIC_LIGHTEDGE_API_URL,
  CONNECTRIA: process.env.NEXT_PUBLIC_CONNECTRIA_API_URL,
};

// Interceptors: Add interceptors for request and response
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add authentication token to the headers if exists
      const token = localStorage.getItem("token");
      if (token) {
        // Ensure headers are initialized
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Centralize handling for specific error codes, such as token expiration
    if (error.response && error.response.status === 401) {
      console.log("Token expired. Handle refresh token logic here.");
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Get dynamic headers, allowing for authentication and custom headers
  static _getHeaders(customHeaders: any): Record<string, string> {
    const token = localStorage.getItem("token"); // Example: retrieve token from localStorage
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    } as Record<string, string>;  // Cast the result to `Record<string, string>`
  }

  // Centralized request handling with error and response processing
  static async _handleRequest(config: AxiosRequestConfig): Promise<any> {
    try {
      const response = await axios(config);
      return ApiService._handleSuccess(response);
    } catch (error) {
      return ApiService._handleError(error);
    }
  }

  static _handleSuccess(response: AxiosResponse): any {
    try {
      if (typeof response.data === "string") {
        return JSON.parse(response.data);
      }
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      return response.data;
    }

    return response.data;
  }

  static _handleError(error: any): any {
    // Centralize error handling (e.g., custom error messages)
    console.error("API Error:", error);
    return {
      success: false,
      errorMessage: error.message || "An error occurred",
    };
  }

  // General request method for all HTTP types (GET, POST, PUT, DELETE)
  static _request(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data: any = null,
    options: AxiosRequestConfig = {},
    baseURL: string
  ): Promise<any> {
    const config: AxiosRequestConfig = {
      method,
      url: baseURL + url,
      data: data,
      timeout: 15000,
      headers: ApiService._getHeaders(options.headers),
      ...options,
    };
    return ApiService._handleRequest(config);
  }

  static getBaseUrl(platform: keyof BaseUrlConfig): string | undefined {
    switch (platform) {
      case "LIGHTEDGE":
        return BaseUrlConfig.LIGHTEDGE;
      case "CONNECTRIA":
        return BaseUrlConfig.CONNECTRIA;
      default:
        throw new Error("Invalid platform");
    }
  }

  // Private methods for specific HTTP requests
  static _post(url: string, data: any, options: AxiosRequestConfig = {}, baseUrl: string): Promise<any> {
    return this._request("post", url, data, options, baseUrl);
  }

  static _get(url: string, options: AxiosRequestConfig = {}, baseUrl: string): Promise<any> {
    return this._request("get", url, null, options, baseUrl);
  }

  static _put(url: string, data: any, options: AxiosRequestConfig = {}, baseUrl: string): Promise<any> {
    return this._request("put", url, data, options, baseUrl);
  }

  static _delete(url: string, options: AxiosRequestConfig = {}, baseUrl: string): Promise<any> {
    return this._request("delete", url, null, options, baseUrl);
  }

  // Hook for GET requests with optional SWR config
  static useGetRequest(
    url: string | null,
    options: SWRConfiguration = {},
    baseURL: string
  ) {
    const fetcher = (url: string) => ApiService._get(url, {}, baseURL);
    const { data, error, mutate, isValidating } = useSWR(url ? [baseURL + url] : null, fetcher, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options, // SWR options
    });
    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
  }

  // Hook for POST requests with optional SWR config
  static usePostRequest(
    url: string | null,
    data: any,
    options: SWRConfiguration = {},
    baseURL: string
  ) {
    const fetcher = (url: string) => ApiService._post(url, data, {}, baseURL);
    const { data: responseData, error, mutate, isValidating } = useSWR(
      url ? [baseURL + url, data] : null,
      fetcher,
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        ...options, // SWR options
      }
    );
    return {
      data: responseData,
      isLoading: !error && !responseData,
      isError: error,
      mutate,
      isValidating,
    };
  }

  // Hook for PUT requests with optional SWR config
  static usePutRequest(
    url: string | null,
    data: any,
    options: SWRConfiguration = {},
    baseURL: string
  ) {
    const fetcher = (url: string) => ApiService._put(url, data, {}, baseURL);
    const { data: responseData, error, mutate, isValidating } = useSWR(
      url ? [baseURL + url, data] : null,
      fetcher,
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        ...options, // SWR options
      }
    );
    return {
      data: responseData,
      isLoading: !error && !responseData,
      isError: error,
      mutate,
      isValidating,
    };
  }

  // Hook for DELETE requests with optional SWR config
  static useDeleteRequest(
    url: string | null,
    options: SWRConfiguration = {},
    baseURL: string
  ) {
    const fetcher = (url: string) => ApiService._delete(url, {}, baseURL);
    const { data, error, mutate, isValidating } = useSWR(
      url ? [baseURL + url] : null,
      fetcher,
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        ...options, // SWR options
      }
    );
    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
  }
}

export default ApiService;
