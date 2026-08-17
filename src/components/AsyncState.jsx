import { Alert, Box, Card, Skeleton, Stack, Typography } from '@mui/material';

export function CardSkeletons({ count = 4 }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' }, gap: 3 }}>{Array.from({ length: count }, (_, i) => <Card key={i} sx={{ p: 4 }}><Skeleton width="30%" /><Skeleton height={44} /><Skeleton /><Skeleton width="75%" /></Card>)}</Box>;
}
export function StateCard({ title, message, severity = 'info' }) {
  return <Card sx={{ p: 3 }}><Alert severity={severity} variant="outlined" sx={{ bgcolor: 'transparent', border: 0 }}><Stack><Typography fontWeight={600}>{title}</Typography><Typography variant="body2">{message}</Typography></Stack></Alert></Card>;
}
