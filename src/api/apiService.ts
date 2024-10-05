import useSWR, { SWRConfiguration } from "swr";
import apiClient from "./apiClient";

// BaseUrlConfig interface (should match the one in apiClient)
interface BaseUrlConfig {
  ZAINAR: string;
  // Add other providers as needed
}

/**
 * Hook for GET requests.
 * @template T - The expected response data type.
 * @param {string | null} url - The endpoint URL.
 * @param {SWRConfiguration} [options={}] - Optional SWR configuration.
 * @param {keyof BaseUrlConfig} [provider="ZAINAR"] - The base URL provider key.
 * @returns {Object} - An object containing data, loading state, error state, mutate function, and validation state.
 */
export function useGetRequest<T>(
  url: string | null,
  options: SWRConfiguration = {},
  provider: keyof BaseUrlConfig = "ZAINAR"
) {
  const fetcher = () => {
    if (!url) return null;
    return apiClient.get<T>(url, {}, provider);
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...options,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
}

/**
 * Hook for POST requests.
 * @template T - The expected response data type.
 * @param {string | null} url - The endpoint URL.
 * @param {any} data - The data to post.
 * @param {SWRConfiguration} [options={}] - Optional SWR configuration.
 * @param {keyof BaseUrlConfig} [provider="ZAINAR"] - The base URL provider key.
 * @returns {Object} - An object containing data, loading state, error state, mutate function, and validation state.
 */
export function usePostRequest<T>(
  url: string | null,
  data: any,
  options: SWRConfiguration = {},
  provider: keyof BaseUrlConfig = "ZAINAR"
) {
  const fetcher = () => {
    if (!url) return null;
    return apiClient.post<T>(url, data, {}, provider);
  };

  const { data: responseData, error, mutate, isValidating } = useSWR(
    url ? [url, data] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options,
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

/**
 * Hook for PUT requests.
 * @template T - The expected response data type.
 * @param {string | null} url - The endpoint URL.
 * @param {any} data - The data to put.
 * @param {SWRConfiguration} [options={}] - Optional SWR configuration.
 * @param {keyof BaseUrlConfig} [provider="ZAINAR"] - The base URL provider key.
 * @returns {Object} - An object containing data, loading state, error state, mutate function, and validation state.
 */
export function usePutRequest<T>(
  url: string | null,
  data: any,
  options: SWRConfiguration = {},
  provider: keyof BaseUrlConfig = "ZAINAR"
) {
  const fetcher = () => {
    if (!url) return null;
    return apiClient.put<T>(url, data, {}, provider);
  };

  const { data: responseData, error, mutate, isValidating } = useSWR(
    url ? [url, data] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...options,
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

/**
 * Hook for DELETE requests.
 * @template T - The expected response data type.
 * @param {string | null} url - The endpoint URL.
 * @param {SWRConfiguration} [options={}] - Optional SWR configuration.
 * @param {keyof BaseUrlConfig} [provider="ZAINAR"] - The base URL provider key.
 * @returns {Object} - An object containing data, loading state, error state, mutate function, and validation state.
 */
export function useDeleteRequest<T>(
  url: string | null,
  options: SWRConfiguration = {},
  provider: keyof BaseUrlConfig = "ZAINAR"
) {
  const fetcher = () => {
    if (!url) return null;
    return apiClient.delete<T>(url, {}, provider);
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    ...options,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
}
