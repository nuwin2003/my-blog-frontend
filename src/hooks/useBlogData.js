import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as posts from '../api/postService';
import * as categories from '../api/categoryService';

export const usePosts = (params) => useQuery({ queryKey: ['posts', params], queryFn: () => posts.getPosts(params) });
export const usePost = (slug) => useQuery({ queryKey: ['post', slug], queryFn: () => posts.getPostBySlug(slug), enabled: Boolean(slug) });
export const useAdminPosts = (params) => useQuery({ queryKey: ['admin-posts', params], queryFn: () => posts.getAdminPosts(params) });
export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: categories.getCategories });

const useInvalidatingMutation = (mutationFn, keys) => {
  const client = useQueryClient();
  return useMutation({ mutationFn, onSuccess: () => keys.forEach((key) => client.invalidateQueries({ queryKey: [key] })) });
};
export const useCreatePost = () => useInvalidatingMutation(posts.createPost, ['posts', 'admin-posts']);
export const useUpdatePost = () => useInvalidatingMutation(({ id, values }) => posts.updatePost(id, values), ['posts', 'admin-posts', 'post']);
export const useDeletePost = () => useInvalidatingMutation(posts.deletePost, ['posts', 'admin-posts', 'categories']);
export const useCreateCategory = () => useInvalidatingMutation(categories.createCategory, ['categories']);
export const useUpdateCategory = () => useInvalidatingMutation(({ id, values }) => categories.updateCategory(id, values), ['categories']);
export const useDeleteCategory = () => useInvalidatingMutation(categories.deleteCategory, ['categories', 'posts', 'admin-posts']);
