import { useState } from 'react';
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { CategoryRounded, DashboardRounded, DescriptionRounded, LogoutRounded, MenuRounded, OpenInNewRounded } from '@mui/icons-material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const width = 250;
const links = [['Dashboard', '/admin/dashboard', <DashboardRounded />], ['Posts', '/admin/posts', <DescriptionRounded />], ['Categories', '/admin/categories', <CategoryRounded />]];
export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false); const location = useLocation(); const navigate = useNavigate(); const { admin, logout } = useAuth();
  const leave = () => { logout(); navigate('/'); };
  const nav = <Box sx={{ p: 2 }}><Typography variant="h5" color="primary.main" px={1} py={2}>devnotes.</Typography><Divider sx={{ mb: 2 }} /><List>{links.map(([label, to, icon]) => <ListItemButton key={to} component={Link} to={to} selected={location.pathname === to} onClick={() => setMobileOpen(false)} sx={{ borderRadius: 3, mb: .5 }}><ListItemIcon sx={{ minWidth: 42 }}>{icon}</ListItemIcon><ListItemText primary={label} /></ListItemButton>)}</List><Divider sx={{ my: 2 }} /><ListItemButton onClick={leave} sx={{ borderRadius: 3 }}><ListItemIcon sx={{ minWidth: 42 }}><LogoutRounded /></ListItemIcon><ListItemText primary="Logout" /></ListItemButton></Box>;
  const drawerPaper = (theme) => ({
    width,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(7,17,30,.82)' : 'rgba(255,255,255,.72)',
    backgroundImage: 'none',
    backdropFilter: 'blur(24px)',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(144,202,249,.12)' : 'rgba(66,165,245,.18)',
  });
  return <Box sx={{ display: 'flex', minHeight: '100vh' }}><Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, width, '& .MuiDrawer-paper': drawerPaper }}>{nav}</Drawer><Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: 'none' }, '& .MuiDrawer-paper': drawerPaper }}>{nav}</Drawer><Box sx={{ flex: 1, minWidth: 0 }}><AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(66,165,245,.15)' }}><Toolbar><IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, mr: 1 }}><MenuRounded /></IconButton><Typography fontWeight={600} sx={{ flex: 1 }}>Publishing studio</Typography><Button component={Link} to="/" target="_blank" endIcon={<OpenInNewRounded />} sx={{ display: { xs: 'none', sm: 'flex' } }}>View site</Button><Stack direction="row" alignItems="center" gap={1} ml={2}><Avatar sx={{ bgcolor: 'primary.main', width: 34, height: 34 }}>{(admin?.name || admin?.email || 'A')[0].toUpperCase()}</Avatar><Typography variant="body2" sx={{ display: { xs: 'none', lg: 'block' } }}>{admin?.name || admin?.email || 'Administrator'}</Typography></Stack></Toolbar></AppBar><Box component="main" sx={{ p: { xs: 2, sm: 3, lg: 5 } }}><Outlet /></Box></Box></Box>;
}
