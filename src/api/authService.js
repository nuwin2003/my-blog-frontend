import axiosClient, { TOKEN_KEY } from './axiosClient';

const extractToken = (data) => data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken;
export const login = async (credentials) => {
  const { data } = await axiosClient.post('/api/admin/login', credentials);
  const token = extractToken(data);
  if (token) localStorage.setItem(TOKEN_KEY, token);
  return { ...data, token };
};
export const logout = () => localStorage.removeItem(TOKEN_KEY);
export const getCurrentAdmin = () => axiosClient.get('/api/admin/me').then(({ data }) => data);
