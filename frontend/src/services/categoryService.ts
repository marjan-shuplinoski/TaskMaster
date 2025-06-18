import api from './api';

export async function getCategories(): Promise<{ _id: string; name: string; color?: string; icon?: string }[]> {
  const { data } = await api.get('/categories');
  return data;
}

export async function createCategory(category: { name: string }): Promise<any> {
  const { data } = await api.post('/categories', category);
  return data;
}

export async function updateCategory(category: Partial<{ _id: string; name: string; color?: string; icon?: string }> & { _id: string }): Promise<any> {
  const { _id, ...rest } = category;
  const { data } = await api.put(`/categories/${_id}`, rest);
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
