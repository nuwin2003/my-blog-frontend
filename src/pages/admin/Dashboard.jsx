import { Card, Chip, Grid, Stack, Typography } from '@mui/material';
import { useAdminPosts, useCategories } from '../../hooks/useBlogData';
import { listFrom, formatDate } from '../../utils/apiData';

export default function Dashboard() {
  const postsQuery = useAdminPosts({ limit: 100, offset: 0, sort: 'newest' }); const categoriesQuery = useCategories();
  const posts = listFrom(postsQuery.data, ['posts']); const categories = listFrom(categoriesQuery.data, ['categories']);
  const stats = [['Total posts', posts.length], ['Published', posts.filter((p) => p.status === 'published').length], ['Drafts', posts.filter((p) => p.status === 'draft').length], ['Categories', categories.length]];
  return <><Typography variant="h3" mb={1}>Dashboard</Typography><Typography color="text.secondary" mb={4}>A quick view of your publishing workspace.</Typography><Grid container spacing={3}>{stats.map(([label, value]) => <Grid key={label} size={{ xs: 12, sm: 6, lg: 3 }}><Card sx={{ p: 3 }}><Typography color="text.secondary">{label}</Typography><Typography variant="h3" color="primary.main">{postsQuery.isLoading ? '—' : value}</Typography></Card></Grid>)}</Grid><Card sx={{ p: 3, mt: 3 }}><Typography variant="h6" mb={2}>Most recent post</Typography>{posts[0] ? <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}><Stack><Typography fontWeight={600}>{posts[0].title}</Typography><Typography variant="body2" color="text.secondary">Updated {formatDate(posts[0].updatedAt || posts[0].createdAt)}</Typography></Stack><Chip label={posts[0].status} color={posts[0].status === 'published' ? 'success' : 'default'} /></Stack> : <Typography color="text.secondary">No posts yet.</Typography>}</Card></>;
}
