import { useState } from 'react';
import { AppBar, Box, Container, Drawer, IconButton, Stack, Toolbar, Button } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined, MenuRounded, SearchRounded, CloseRounded } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import devNotesLogo from '../assets/DeveNotes.jpg';

const links = [['Home', '/'], ['Writing', '/#writing'], ['About', '/about']];

export default function Navbar({ mode, toggleMode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const nav = (mobile = false) => links.map(([label, to]) => (
    <Button key={label} component={Link} to={to} onClick={() => { setOpen(false); if (to === '/#writing') window.setTimeout(() => document.getElementById('writing')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0); }}
      sx={{ color: (to.includes('#') ? location.pathname === '/' && location.hash === '#writing' : location.pathname === to) ? 'primary.main' : 'text.secondary', justifyContent: mobile ? 'flex-start' : 'center' }}>
      {label}
    </Button>
  ));
  return <>
    <AppBar elevation={0} position="sticky" color="transparent" sx={{ backdropFilter: 'blur(20px)', borderBottom: '1px solid', borderColor: 'rgba(144,202,249,.18)' }}>
      <Container maxWidth="lg"><Toolbar disableGutters sx={{ minHeight: 76 }}>
        <Box component={Link} to="/" aria-label="DevNotes home" sx={{ width: { xs: 142, sm: 176 }, height: 54, mr: 'auto', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, textDecoration: 'none' }}>
          <Box component="img" src={devNotesLogo} alt="DevNotes — Your Coding & Development Blog" sx={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.2)', transformOrigin: 'center' }} />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>{nav()}</Stack>
        <IconButton aria-label="Search" sx={{ ml: { xs: 0, md: 2 } }}><SearchRounded /></IconButton>
        <IconButton aria-label="Toggle color mode" onClick={toggleMode}>{mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}</IconButton>
        <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}><MenuRounded /></IconButton>
      </Toolbar></Container>
    </AppBar>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 280, p: 3 } }}>
      <IconButton onClick={() => setOpen(false)} sx={{ alignSelf: 'flex-end' }}><CloseRounded /></IconButton>
      <Stack spacing={1} mt={4}>{nav(true)}</Stack>
    </Drawer>
  </>;
}
