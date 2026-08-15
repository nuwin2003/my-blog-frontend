import { Box } from '@mui/material';
import PostCard from './PostCard';

export default function BlogGrid({ posts }) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
    {posts.map(post => <PostCard key={post.id} post={post} />)}
  </Box>;
}
