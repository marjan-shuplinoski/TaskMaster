export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  category: string;
  dueDate?: string;
  tags?: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
}
