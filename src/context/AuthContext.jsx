import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentAdmin, login as loginRequest, logout as clearToken } from '../api/authService';
import { TOKEN_KEY } from '../api/axiosClient';

const AuthContext = createContext(null);

const adminFromLogin = (result, email) => result.admin || result.user || result.data?.admin || result.data?.user || { email, name: email.split('@')[0] };

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  const logout = () => { clearToken(); setAdmin(null); };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return setLoading(false);
    getCurrentAdmin()
      .then((data) => setAdmin(data.admin || data.user || data.data || data))
      .catch((error) => {
        if (error.response?.status === 404) setAdmin({ name: 'Administrator' });
        else logout();
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.addEventListener('admin:unauthorized', logout);
    return () => window.removeEventListener('admin:unauthorized', logout);
  }, []);

  const value = useMemo(() => ({
    admin, loading, isAuthenticated: Boolean(admin && localStorage.getItem(TOKEN_KEY)),
    login: async (credentials) => { const result = await loginRequest(credentials); setAdmin(adminFromLogin(result, credentials.email)); return result; },
    logout,
  }), [admin, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
