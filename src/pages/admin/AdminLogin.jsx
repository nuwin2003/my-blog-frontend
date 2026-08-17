import { useState } from 'react';
import { Alert, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { LockRounded } from '@mui/icons-material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiErrorMessage } from '../../api/axiosClient';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const auth = useAuth(); const navigate = useNavigate(); const location = useLocation();
  if (auth.isAuthenticated) return <Navigate to="/admin/dashboard" replace />;
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { await auth.login(form); navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true }); } catch (e) { setError(apiErrorMessage(e)); } finally { setBusy(false); } };
  return <Container maxWidth="sm" sx={{ minHeight: '76vh', display: 'grid', placeItems: 'center', py: 8 }}><Card component="form" onSubmit={submit} sx={{ width: '100%', p: { xs: 3, sm: 5 } }}><Box sx={{ width: 54, height: 54, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: 'white', mb: 3 }}><LockRounded /></Box><Typography variant="h4">Welcome back</Typography><Typography color="text.secondary" mb={4}>Sign in to the private publishing workspace.</Typography><Stack spacing={2}>{error && <Alert severity="error">{error}</Alert>}<TextField label="Email" type="email" required autoFocus value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><TextField label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><Button type="submit" variant="contained" size="large" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button></Stack></Card></Container>;
}
