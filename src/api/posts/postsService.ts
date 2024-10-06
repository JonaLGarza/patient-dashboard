import { SWRConfiguration } from "swr";
import { useGetRequest, usePostRequest } from "../apiService";
import { AxiosRequestConfig } from "axios";
import apiClient from "../apiClient";

// Hook for fetching posts
export const useGetPosts = (options: SWRConfiguration = {}) => {
  return useGetRequest("posts", options, "ZAINAR");
};

// Hook for creating a post
export const useCreatePost = (data: any, options: SWRConfiguration = {}) => {
  return usePostRequest("posts", data, options, "ZAINAR");
};

export const fetchPosts = (options: AxiosRequestConfig = {}) => {
  return apiClient.get("posts",options, "ZAINAR")
}