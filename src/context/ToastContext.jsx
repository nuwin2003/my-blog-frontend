import { createContext, useContext, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const api = useMemo(() => ({ showToast: (message, severity = 'success') => setToast({ open: true, message, severity }) }), []);
  return <ToastContext.Provider value={api}>{children}<Snackbar open={toast.open} autoHideDuration={4500} onClose={() => setToast((x) => ({ ...x, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}><Alert variant="filled" severity={toast.severity} onClose={() => setToast((x) => ({ ...x, open: false }))} sx={{ borderRadius: 3, backdropFilter: 'blur(16px)' }}>{toast.message}</Alert></Snackbar></ToastContext.Provider>;
}
export const useToast = () => useContext(ToastContext);
