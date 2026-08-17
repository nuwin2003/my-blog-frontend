import { useState } from 'react';
import { Box, Button, Chip, Container, Pagination, Stack, Typography } from '@mui/material';
import { ArrowDownwardRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import BlogGrid from '../components/BlogGrid';
import { CardSkeletons, StateCard } from '../components/AsyncState';
import { useCategories, usePosts } from '../hooks/useBlogData';
import { listFrom, totalFrom } from '../utils/apiData';

const PAGE_SIZE = 6;
export default function Home() {
  const { slug: routeCategory } = useParams();
  const [filter, setFilter] = useState(routeCategory || '');
  const [page, setPage] = useState(1);
  const params = { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE, sort: 'newest', ...(filter && { category: filter }) };
  const postsQuery = usePosts(params);
  const categoriesQuery = useCategories();
  const postList = listFrom(postsQuery.data, ['posts']);
  const categoryList = listFrom(categoriesQuery.data, ['categories']);
  const total = totalFrom(postsQuery.data, postList);
  const featured = !filter && page === 1 ? postList[0] : null;
  const visible = featured ? postList.slice(1) : postList;
  const selectCategory = (category) => { setFilter(category); setPage(1); };

  return <Container maxWidth="lg"><Box component={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ minHeight: { xs: '68vh', md: '76vh' }, display: 'flex', alignItems: 'center', py: 8 }}><Box maxWidth={880}><Chip icon={<AutoAwesomeRounded />} label="Notes from the workbench" sx={{ mb: 3, bgcolor: 'rgba(144,202,249,.18)' }} /><Typography variant="h1" sx={{ fontSize: { xs: '3.1rem', sm: '4.7rem', md: '6.5rem' }, lineHeight: .98, mb: 4 }}>Engineering,<br /><Box component="span" sx={{ color: 'primary.main' }}>clearly explained.</Box></Typography><Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, maxWidth: 650, lineHeight: 1.7, mb: 4 }}>Field notes on stubborn bugs, emerging technology, and the quiet decisions that make software better.</Typography><Button href="#writing" variant="contained" endIcon={<ArrowDownwardRounded />} size="large">Start reading</Button></Box></Box>
    {featured && <Box component="section" id="writing" sx={{ scrollMarginTop: 100, mb: 10 }}><Typography variant="overline" color="primary.main" fontWeight={600}>Featured note</Typography><Typography variant="h4" mb={4}>From the field</Typography><PostCard post={featured} featured /></Box>}
    <Box component="section" id={!featured ? 'writing' : undefined} sx={{ scrollMarginTop: 100 }}><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} gap={3} mb={4}><Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', md: '3rem' } }}>Latest thinking</Typography><Stack direction="row" gap={1} flexWrap="wrap"><Chip label={`All (${total})`} onClick={() => selectCategory('')} color={!filter ? 'primary' : 'default'} />{categoryList.map((c) => <Chip key={c.id || c.slug} label={`${c.name} (${c.postCount ?? c.postsCount ?? c._count?.posts ?? 0})`} onClick={() => selectCategory(c.slug)} color={filter === c.slug ? 'primary' : 'default'} variant={filter === c.slug ? 'filled' : 'outlined'} />)}</Stack></Stack>{postsQuery.isLoading ? <CardSkeletons /> : postsQuery.isError ? <StateCard title="The notes could not be loaded" message="Please check the API connection and try again." severity="error" /> : visible.length ? <BlogGrid posts={visible} /> : <StateCard title="No notes here yet" message="New writing will appear here when it is published." />}{total > PAGE_SIZE && <Stack alignItems="center" mt={6}><Pagination page={page} count={Math.ceil(total / PAGE_SIZE)} color="primary" onChange={(_, value) => setPage(value)} /></Stack>}</Box>
  </Container>;
}
