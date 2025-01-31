import axios from "axios";
import { RequestConfig } from "@/types/ApiAxiosType.d";
const baseURL = import.meta.env.VITE_API_URL as string;

export const makeRequest = async ({
  url,
  method,
  headers,
  data,
}: RequestConfig) => {
  try {
    const token = localStorage.getItem("tokenSanctum");
    const response = await axios({
      url: `${baseURL}/${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error making request", error);
    throw error;
  }
};
