import { useEffect, useMemo, useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import PostsList from './pages/admin/PostsList';
import PostForm from './pages/admin/PostForm';
import Categories from './pages/admin/Categories';

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light'); const theme = useMemo(() => getTheme(mode), [mode]); const location = useLocation(); const adminArea = location.pathname.startsWith('/admin');
  const toggleMode = () => setMode((previous) => { const next = previous === 'light' ? 'dark' : 'light'; localStorage.setItem('mode', next); return next; });
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const scrollToSection = () => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const frame = requestAnimationFrame(scrollToSection);
    const retry = window.setTimeout(scrollToSection, 250);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(retry); };
  }, [location.pathname, location.hash]);
  return <ThemeProvider theme={theme}><CssBaseline /><Box sx={{ minHeight: '100vh', position: 'relative', background: mode === 'light' ? 'linear-gradient(135deg,#FAFAFA 0%,#EFF8FF 48%,#F7F3FF 100%)' : 'linear-gradient(135deg,#07111E,#0B1929)' }}><Box sx={{ position: 'fixed', width: 420, height: 420, borderRadius: '50%', bgcolor: 'rgba(66,165,245,.14)', filter: 'blur(80px)', top: -130, right: -100, pointerEvents: 'none' }} />{!adminArea && <Navbar mode={mode} toggleMode={toggleMode} />}<Box component="main" sx={{ position: 'relative' }}><Routes><Route path="/" element={<Home />} /><Route path="/posts/:slug" element={<PostPage />} /><Route path="/category/:slug" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/xxxx-admin" element={<AdminLogin />} /><Route path="/admin/login" element={<Navigate to="/xxxx-admin" replace />} /><Route element={<RequireAuth />}><Route element={<AdminLayout />}><Route path="/admin/dashboard" element={<Dashboard />} /><Route path="/admin/posts" element={<PostsList />} /><Route path="/admin/posts/new" element={<PostForm />} /><Route path="/admin/posts/:id/edit" element={<PostForm />} /><Route path="/admin/categories" element={<Categories />} /></Route></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></Box>{!adminArea && <Footer />}</Box></ThemeProvider>;
}
