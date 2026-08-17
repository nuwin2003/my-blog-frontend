import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { ArrowOutwardRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PostCard({ post, featured = false }) {
  const color = post.color || '#42A5F5';
  const category = post.category?.name || post.category || 'Uncategorized';
  const date = post.publishedAt || post.createdAt;
  return <Card component={motion.article} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45 }} sx={{ height: '100%', overflow: 'hidden', transition: 'transform .3s, box-shadow .3s', '&:hover': { transform: 'translateY(-7px)', boxShadow: `0 24px 70px ${color}33` } }}><CardActionArea component={Link} to={`/posts/${post.slug}`} sx={{ height: '100%', display: 'flex', alignItems: 'stretch' }}><CardContent sx={{ p: { xs: 3, md: featured ? 5 : 3.5 }, display: 'flex', flexDirection: 'column', width: '100%' }}><Stack direction="row" alignItems="center" justifyContent="space-between" mb={featured ? 5 : 4}><Chip label={category} size="small" sx={{ bgcolor: `${color}20`, fontWeight: 500 }} /><Typography variant="h5" sx={{ color, opacity: .65, fontWeight: 300 }}>{post.readTimeMinutes ? `${post.readTimeMinutes}m` : '↗'}</Typography></Stack><Typography variant={featured ? 'h3' : 'h5'} sx={{ fontSize: featured ? { xs: '2rem', md: '3.2rem' } : '1.35rem', mb: 2 }}>{post.title}</Typography><Typography color="text.secondary" sx={{ mb: 4 }}>{post.excerpt}</Typography><Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto"><Typography variant="caption" color="text.secondary">{date ? new Date(date).toLocaleDateString() : 'Recently'} · {post.readTimeMinutes ? `${post.readTimeMinutes} min read` : 'Quick read'}</Typography><Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: `${color}25`, display: 'grid', placeItems: 'center' }}><ArrowOutwardRounded fontSize="small" /></Box></Stack></CardContent></CardActionArea></Card>;
}
