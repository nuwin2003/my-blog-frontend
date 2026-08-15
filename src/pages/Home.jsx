import { useState } from 'react';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { ArrowDownwardRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';
import BlogGrid from '../components/BlogGrid';
import { categories, posts } from '../data/posts';

export default function Home() {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? posts.slice(1) : posts.filter(p => p.category === filter);
  return <>
    <Container maxWidth="lg">
      <Box component={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ minHeight: { xs: '72vh', md: '78vh' }, display: 'flex', alignItems: 'center', py: 8 }}>
        <Box maxWidth={880}>
          <Chip icon={<AutoAwesomeRounded />} label="Notes from the workbench" sx={{ mb: 3, bgcolor: 'rgba(144,202,249,.18)' }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '3.1rem', sm: '4.7rem', md: '6.5rem' }, lineHeight: .98, mb: 4 }}>
            Engineering,<br /><Box component="span" sx={{ color: 'primary.main' }}>clearly explained.</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, maxWidth: 650, lineHeight: 1.7, mb: 4 }}>
            Field notes on stubborn bugs, emerging technology, and the quiet decisions that make software better.
          </Typography>
          <Button href="#writing" variant="contained" endIcon={<ArrowDownwardRounded />} size="large">Start reading</Button>
        </Box>
      </Box>
      <Box component="section" id="writing" sx={{ scrollMarginTop: 100 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'end' }} gap={2} mb={4}>
          <Box><Typography variant="overline" color="primary.main" fontWeight={600}>Featured note</Typography><Typography variant="h4">From the field</Typography></Box>
          <Typography color="text.secondary">Carefully debugged. Honestly documented.</Typography>
        </Stack>
        <PostCard post={posts[0]} featured />
      </Box>
      <Box component="section" sx={{ pt: 12 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} gap={3} mb={4}>
          <Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', md: '3rem' } }}>Latest thinking</Typography>
          <Stack direction="row" gap={1} flexWrap="wrap">{categories.map(c => <Chip key={c} label={c} onClick={() => setFilter(c)} color={filter === c ? 'primary' : 'default'} variant={filter === c ? 'filled' : 'outlined'} />)}</Stack>
        </Stack>
        <BlogGrid posts={visible} />
      </Box>
    </Container>
  </>;
}
