import axiosClient from './axiosClient';

const unwrap = (response) => response.data;

const writableFields = [
  'title', 'excerpt', 'content', 'categoryId', 'tags', 'externalUrls',
  'status', 'readTimeMinutes', 'coverImage', 'images',
];

const toFormData = (values) => {
  const data = new FormData();
  writableFields.forEach((key) => {
    const value = values[key];
    if (value === undefined || value === null || value === '') return;
    if (key === 'tags' || key === 'externalUrls') data.append(key, JSON.stringify(value));
    else if (key === 'images') Array.from(value).forEach((file) => data.append('images', file));
    else if (key === 'coverImage' && !(value instanceof File)) return;
    else data.append(key, value);
  });
  return data;
};

export const getPosts = (params = {}) => axiosClient.get('/api/posts', { params }).then(unwrap);
export const getPostBySlug = (slug) => axiosClient.get(`/api/posts/${slug}`).then(unwrap);
export const getAdminPosts = (params = {}) => axiosClient.get('/api/admin/posts', { params }).then(unwrap);
export const createPost = (values) => axiosClient.post('/api/admin/posts', toFormData(values)).then(unwrap);
export const updatePost = (id, values) => axiosClient.put(`/api/admin/posts/${id}`, toFormData(values)).then(unwrap);
export const deletePost = (id) => axiosClient.delete(`/api/admin/posts/${id}`).then(unwrap);
