import api from './api';
import type { Task } from '../types/task';

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get('/tasks');
  return data;
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const { data } = await api.post('/tasks', task);
  return data;
}

export async function updateTask(task: Partial<Task> & { _id: string }): Promise<Task> {
  const { _id, ...rest } = task;
  const { data } = await api.put(`/tasks/${_id}`, rest);
  return data;
}

export async function patchTaskStatus(id: string, status: string): Promise<any> {
  const { data } = await api.patch(`/tasks/${id}/status`, { status });
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
