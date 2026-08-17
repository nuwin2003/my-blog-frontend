import axiosClient from './axiosClient';

const unwrap = (response) => response.data;
export const getCategories = () => axiosClient.get('/api/categories').then(unwrap);
export const createCategory = (values) => axiosClient.post('/api/admin/categories', values).then(unwrap);
export const updateCategory = (id, values) => axiosClient.put(`/api/admin/categories/${id}`, values).then(unwrap);
export const deleteCategory = (id) => axiosClient.delete(`/api/admin/categories/${id}`).then(unwrap);
