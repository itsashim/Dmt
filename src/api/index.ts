import axios from "axios";

const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const ImageAPI: string =
  "https://eu2.contabostorage.com/2e1511f8f62f49e3916647606460a786:dmt";

export const httpHeader = {
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
};

export const multipartHeader = {
  "Content-Type": "multipart/form-data",
  authorization: `Bearer ${token}`,
};

const api = axios.create({
  baseURL: baseUrl,
  headers: httpHeader,
});

const setUserIdHeader = (userId: string | null) => {
  api.defaults.headers.common["User_id"] = userId;
};

setUserIdHeader(user_id);

export default api;
