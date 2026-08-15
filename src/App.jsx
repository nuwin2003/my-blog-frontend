import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { getTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import About from './pages/About';

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode(prev => { const next = prev === 'light' ? 'dark' : 'light'; localStorage.setItem('mode', next); return next; });
  return <ThemeProvider theme={theme}><CssBaseline />
    <Box sx={{ minHeight: '100vh', position: 'relative', background: mode === 'light' ? 'linear-gradient(135deg,#FAFAFA 0%,#EFF8FF 48%,#F7F3FF 100%)' : 'linear-gradient(135deg,#07111E,#0B1929)' }}>
      <Box sx={{ position: 'fixed', width: 420, height: 420, borderRadius: '50%', bgcolor: 'rgba(66,165,245,.14)', filter: 'blur(80px)', top: -130, right: -100, pointerEvents: 'none' }} />
      <Box sx={{ position: 'fixed', width: 360, height: 360, borderRadius: '50%', bgcolor: 'rgba(124,77,255,.10)', filter: 'blur(90px)', bottom: -100, left: -100, pointerEvents: 'none' }} />
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Box component="main" sx={{ position: 'relative' }}><Routes><Route path="/" element={<Home />} /><Route path="/post/:id" element={<PostPage />} /><Route path="/about" element={<About />} /></Routes></Box>
      <Footer />
    </Box>
  </ThemeProvider>;
}
