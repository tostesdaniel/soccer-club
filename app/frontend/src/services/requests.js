import axios from "axios";

const api = axios.create({
  baseURL: `https://soccer-club-production.up.railway.app`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  console.log("endpoint", endpoint);
  const { data } = await api.get(endpoint);
  console.log("🛠️ ~ requestData ~ data", data);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
