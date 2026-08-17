import { Box, Container, Divider, Stack, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <Box component="footer" sx={{ mt: 12, py: 5 }}><Container maxWidth="lg"><Divider sx={{ mb: 4 }} /><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}><Typography variant="body2" color="text.secondary">© 2026 devnotes. Built thoughtfully. <IconButton component={Link} to="/xxxx-admin" aria-label="Site access" size="small" sx={{ ml: 1, width: 16, height: 16, opacity: .18, bgcolor: 'primary.main', '&:hover': { opacity: .55 } }} /></Typography><Stack direction="row" spacing={3}>{['GitHub', 'LinkedIn', 'RSS'].map((x) => <MuiLink key={x} href="#" color="text.secondary" underline="hover">{x}</MuiLink>)}</Stack></Stack></Container></Box>;
}
