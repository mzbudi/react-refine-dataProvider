import axios from "axios";
import { DataProvider, HttpError } from "@pankod/refine-core";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export const postProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.get(url);

    return {
      data,
      total: data.length,
    };
  },
  create: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(url);

    return {
      data,
    };
  },
  update: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.put(url);

    return {
      data,
    };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url);

    return {
      data,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return {
      data,
    };
  },
  getApiUrl: () => apiUrl,
});
