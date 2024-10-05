import { SWRConfiguration } from "swr";
import { useGetRequest, usePostRequest } from "../apiService";

// Hook for fetching posts
export const useGetPosts = (options: SWRConfiguration = {}) => {
  return useGetRequest("/posts", options, "ZAINAR");
};

// Hook for creating a post
export const useCreatePost = (data: any, options: SWRConfiguration = {}) => {
  return usePostRequest("/posts", data, options, "ZAINAR");
};
