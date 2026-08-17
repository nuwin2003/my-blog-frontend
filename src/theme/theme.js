import { alpha, createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: { main: '#1565C0', light: '#42A5F5', dark: '#0D47A1' },
    secondary: { main: '#7C4DFF' },
    background: mode === 'light'
      ? { default: '#F7FBFF', paper: '#FFFFFF' }
      : { default: '#07111E', paper: '#0D1B2A' },
    text: mode === 'light'
      ? { primary: '#102A43', secondary: '#5B7083' }
      : { primary: '#EDF7FF', secondary: '#A8BDD0' },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.045em' },
    h2: { fontWeight: 700, letterSpacing: '-0.035em' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    body1: { fontWeight: 300, lineHeight: 1.8 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 18 },
  components: {
    MuiCssBaseline: { styleOverrides: {
      html: { scrollBehavior: 'smooth', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", sans-serif' },
      body: { margin: 0, overflowX: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", sans-serif' },
      '#root, button, input, textarea, select, .w-md-editor, .w-md-editor *': {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", sans-serif',
      },
      '::selection': { background: '#90CAF9', color: '#0D47A1' },
    } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12, paddingInline: 20 } } },
    MuiCard: { styleOverrides: { root: ({ theme }) => ({
      background: alpha(theme.palette.background.paper, mode === 'light' ? 0.68 : 0.72),
      backdropFilter: 'blur(18px)',
      border: `1px solid ${alpha(theme.palette.primary.light, 0.2)}`,
      boxShadow: `0 18px 60px ${alpha('#0D47A1', mode === 'light' ? 0.08 : 0.18)}`,
    }) } },
  },
});
