import { Box, Card, Chip, Container, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { CardSkeletons, StateCard } from '../components/AsyncState';
import { usePost } from '../hooks/useBlogData';
import { entityFrom, formatDate } from '../utils/apiData';

export default function PostPage() {
  const { slug } = useParams();
  const query = usePost(slug);
  if (query.isLoading) return <Container sx={{ py: 10 }}><CardSkeletons count={2} /></Container>;
  if (query.isError) return <Container sx={{ py: 10 }}><StateCard title="This note is unavailable" message="It may have moved or is not published yet." severity="error" /></Container>;
  const post = entityFrom(query.data, 'post');
  return <Container maxWidth="md" sx={{ pt: { xs: 7, md: 12 } }}><Box textAlign="center" mb={8}><Chip label={post.category?.name || 'Uncategorized'} color="primary" variant="outlined" sx={{ mb: 3 }} /><Typography variant="h1" sx={{ fontSize: { xs: '2.7rem', md: '4.8rem' }, lineHeight: 1.08, mb: 3 }}>{post.title}</Typography><Typography color="text.secondary">{formatDate(post.publishedAt || post.createdAt)} · {post.readTimeMinutes || 1} min read</Typography></Box>{post.coverImageUrl && <Box component="img" src={post.coverImageUrl} alt="" sx={{ width: '100%', maxHeight: 480, objectFit: 'cover', borderRadius: 5, mb: 6 }} />}<Card component="article" sx={{ p: { xs: 3, md: 6 }, '& h1,& h2,& h3': { mt: 4 }, '& img': { maxWidth: '100%', borderRadius: 3 }, '& pre': { overflowX: 'auto', p: 2, borderRadius: 2, bgcolor: '#081421', color: '#BFE3FF' } }}><Typography variant="h6" color="text.secondary" mb={4}>{post.excerpt}</Typography><ReactMarkdown>{post.content || ''}</ReactMarkdown></Card><Typography component={Link} to="/" sx={{ display: 'inline-block', mt: 4, color: 'primary.main', textDecoration: 'none' }}>← Back to all notes</Typography></Container>;
}
