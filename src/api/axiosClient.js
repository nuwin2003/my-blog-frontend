import axios from 'axios';

export const TOKEN_KEY = 'devnotes_admin_token';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.url?.startsWith('/api/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event('admin:unauthorized'));
    }
    return Promise.reject(error);
  },
);

export const apiErrorMessage = (error) => {
  const payload = error.response?.data;
  const detail = payload?.error?.details?.[0]?.message || payload?.details?.[0]?.message;
  return detail || payload?.error?.message || payload?.message ||
    (typeof payload?.error === 'string' ? payload.error : null) || error.message || 'Something went wrong.';
};

export default axiosClient;
