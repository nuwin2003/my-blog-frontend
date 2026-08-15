import { Box, Card, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { article, posts } from '../data/posts';
import PostCard from '../components/PostCard';

export default function PostPage() {
  return <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 12 } }}>
    <Box maxWidth={850} mx="auto" textAlign="center" mb={8}>
      <Chip label={article.category} color="primary" variant="outlined" sx={{ mb: 3 }} />
      <Typography variant="h1" sx={{ fontSize: { xs: '2.7rem', md: '4.8rem' }, lineHeight: 1.08, mb: 3 }}>{article.title}</Typography>
      <Typography color="text.secondary">{article.date} · {article.readTime}</Typography>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '220px minmax(0, 720px)' }, gap: 7, justifyContent: 'center' }}>
      <Box component="aside" sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack position="sticky" top={110} spacing={1}><Typography variant="overline" fontWeight={600}>In this note</Typography>{article.sections.map(s => <Typography component="a" href={`#${s.id}`} key={s.id} variant="body2" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>{s.title}</Typography>)}</Stack>
      </Box>
      <Box component="article">
        <Typography variant="h5" sx={{ fontWeight: 400, lineHeight: 1.8, mb: 6 }}>{article.intro}</Typography>
        {article.sections.map((s, i) => <Box id={s.id} key={s.id} sx={{ scrollMarginTop: 110, mb: 6 }}>
          <Typography variant="h4" mb={2}>{s.title}</Typography><Typography color="text.secondary">{s.body}</Typography>
          {i === 1 && <Box component="pre" sx={{ p: 3, mt: 4, borderRadius: 3, overflowX: 'auto', bgcolor: '#081421', color: '#BFE3FF', boxShadow: 'inset 0 0 0 1px rgba(144,202,249,.14)' }}><code>{`if (event.version <= record.version) {\n  return; // stale, safely ignored\n}\nawait write(event);`}</code></Box>}
        </Box>)}
        <Divider sx={{ my: 6 }} />
        <Card sx={{ p: 4 }}><Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}><Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 24 }}>NV</Box><Box><Typography variant="h6">Nuwin Vinwath</Typography><Typography color="text.secondary">Software engineer writing about systems, tools, and the human side of building software.</Typography></Box></Stack></Card>
        <Card sx={{ p: 4, mt: 3, textAlign: 'center' }}><Typography variant="h6">Join the conversation</Typography><Typography color="text.secondary">Comments are coming soon. Until then, share your thoughts on LinkedIn or GitHub.</Typography></Card>
      </Box>
    </Box>
    <Box mt={12}><Typography variant="h4" mb={4}>Keep reading</Typography><PostCard post={posts[1]} /></Box>
    <Typography component={Link} to="/" sx={{ display: 'inline-block', mt: 4, color: 'primary.main', textDecoration: 'none' }}>← Back to all notes</Typography>
  </Container>;
}
