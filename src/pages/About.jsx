import { Box, Card, Chip, Container, Stack, Typography } from '@mui/material';

export default function About() {
  return <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}><Typography variant="overline" color="primary.main" fontWeight={600}>About</Typography><Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 5 }}>I build, break,<br />and explain software.</Typography>
    <Card sx={{ p: { xs: 3, md: 6 } }}><Stack direction={{ xs: 'column', md: 'row' }} spacing={5}><Box sx={{ flexShrink: 0, width: 150, height: 180, borderRadius: 4, background: 'linear-gradient(145deg,#90CAF9,#7C4DFF)', display: 'grid', placeItems: 'center', color: 'white', fontSize: 54, fontWeight: 700 }}>NV</Box><Box><Typography variant="h4" mb={2}>Hi, I’m Nuwin.</Typography><Typography color="text.secondary" mb={3}>I’m a software engineer interested in reliable systems, thoughtful products, and teams that learn in public. DevNotes is where I turn hard-won lessons into useful stories for other builders.</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{['TypeScript', 'React', 'Node.js', 'Distributed systems', 'Product thinking'].map(x => <Chip key={x} label={x} />)}</Stack></Box></Stack></Card>
  </Container>;
}
