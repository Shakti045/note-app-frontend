import axios, { Method } from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  // timeout: 10000,
  withCredentials:true
});

export interface ApiResponse<T = any> {
  data: T;
}

export const apiRequest = async <T = any>(
  method: Method,
  url: string,
  data?: any,
  token?: string
): Promise<ApiResponse<T>> => {
  try {
    const isFormData = data instanceof FormData;

    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }), 
      },
    });

    return { data: response.data };
  } catch (error: any) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
    throw new Error("Something went wrong");
  }
};
