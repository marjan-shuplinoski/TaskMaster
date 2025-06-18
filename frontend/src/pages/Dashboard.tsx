import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import '../components/TableCustom.css';
import SummaryWidgets from '../components/SummaryWidgets';
import QuickActions from '../components/QuickActions';
import TaskTable from '../components/TaskTable';
import CategoryTable from '../components/CategoryTable';
import UserHeader from '../components/UserHeader';
import TaskModal from '../components/TaskModal';
import CategoryModal from '../components/CategoryModal';
import Notification from '../components/Notification';
import { getTasks, createTask, updateTask, patchTaskStatus, deleteTask } from '../services/taskService';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; avatar?: string }>({ name: '', avatar: '' });
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    category: '',
    dueDate: '',
    tags: '',
  });
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [saving, setSaving] = useState(false);
  const [categorySaving, setCategorySaving] = useState(false);
  const [showCategoriesTable, setShowCategoriesTable] = useState(false);
  const [editTask, setEditTask] = useState<any | null>(null);
  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string; variant?: 'success' | 'danger' }>({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    const fetchProfile = async () => {
      const apiUrl = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '');
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.user) setUser({ name: data.user.name, avatar: data.user.avatar });
    };
    fetchProfile();
    getTasks().then(setTasks).catch(() => setTasks([]));
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const completed = tasks.filter(t => t.status === 'completed').length;

  const handleModalClose = () => {
    setShowModal(false);
    setForm({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      category: '',
      dueDate: '',
      tags: '',
    });
    setEditTask(null);
  };

  const handleCategoryModalClose = () => {
    setShowCategoryModal(false);
    setCategoryForm({ name: '' });
    setEditCategory(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editTask) {
        await updateTask({
          _id: editTask._id,
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          category: form.category,
          dueDate: form.dueDate,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        });
        setNotification({ show: true, message: 'Task updated!', variant: 'success' });
      } else {
        await createTask({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        });
        setNotification({ show: true, message: 'Task created!', variant: 'success' });
      }
      setShowModal(false);
      getTasks().then(setTasks);
      setForm({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        category: '',
        dueDate: '',
        tags: '',
      });
      setEditTask(null);
    } catch (err: any) {
      setNotification({ show: true, message: err.message || 'Task save failed', variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const handleCategorySave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategorySaving(true);
    try {
      if (editCategory) {
        await updateCategory({ _id: editCategory._id, name: categoryForm.name });
        setNotification({ show: true, message: 'Category updated!', variant: 'success' });
      } else {
        await createCategory({ name: categoryForm.name });
        setNotification({ show: true, message: 'Category created!', variant: 'success' });
      }
      setShowCategoryModal(false);
      setCategoryForm({ name: '' });
      setEditCategory(null);
      getCategories().then(setCategories);
    } catch (err: any) {
      setNotification({ show: true, message: err.message || 'Category save failed', variant: 'danger' });
    } finally {
      setCategorySaving(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(taskId);
      setTasks(tasks => tasks.filter(t => t._id !== taskId));
      setNotification({ show: true, message: 'Task deleted!', variant: 'success' });
    } catch (err: any) {
      setNotification({ show: true, message: err.message || 'Failed to delete task', variant: 'danger' });
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await deleteCategory(catId);
      getCategories().then(setCategories);
      setNotification({ show: true, message: 'Category deleted!', variant: 'success' });
    } catch (err: any) {
      setNotification({ show: true, message: err.message || 'Failed to delete category', variant: 'danger' });
    }
  };

  const openEditModal = (task: any) => {
    setEditTask(task);
    setForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'todo',
      priority: task.priority || 'medium',
      category: task.category || '',
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      tags: Array.isArray(task.tags) ? task.tags.join(', ') : '',
    });
    setShowModal(true);
  };

  const openEditCategoryModal = (cat: any) => {
    setEditCategory(cat);
    setCategoryForm({ name: cat.name });
    setShowCategoryModal(true);
  };

  const handleMarkCompleted = async (task: any) => {
    if (task.status === 'completed') return;
    try {
      await patchTaskStatus(task._id, 'completed');
      getTasks().then(setTasks);
      setNotification({ show: true, message: 'Task marked as completed!', variant: 'success' });
    } catch (err: any) {
      setNotification({ show: true, message: err.message || 'Failed to mark as completed', variant: 'danger' });
    }
  };

  return (
    <div className="dashboard-container bg-light min-vh-100 w-100" style={{ width: '100%' }}>
      <Menu />
      <main className="w-100 d-flex flex-column align-items-center justify-content-center px-2 py-4" style={{ width: '100%' }}>
        <UserHeader name={user.name} avatar={user.avatar} />
        <SummaryWidgets tasksCount={tasks.length} completedCount={completed} categoriesCount={categories.length} />
        <QuickActions
          onAddTask={() => setShowModal(true)}
          onAddCategory={() => setShowCategoryModal(true)}
          onToggleCategories={() => setShowCategoriesTable(v => !v)}
          showCategoriesTable={showCategoriesTable}
        />
        <TaskModal
          show={showModal}
          form={form}
          categories={categories}
          saving={saving}
          editTask={editTask}
          onClose={handleModalClose}
          onChange={handleFormChange}
          onSave={handleSave}
        />
        <CategoryModal
          show={showCategoryModal}
          form={categoryForm}
          saving={categorySaving}
          editCategory={editCategory}
          onClose={handleCategoryModalClose}
          onChange={handleCategoryFormChange}
          onSave={handleCategorySave}
        />
        <Notification show={notification.show} message={notification.message} variant={notification.variant} onClose={() => setNotification(n => ({ ...n, show: false }))} />
        <TaskTable
          tasks={tasks}
          categories={categories}
          onMarkCompleted={handleMarkCompleted}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
        {showCategoriesTable && (
          <CategoryTable
            categories={categories}
            onEdit={openEditCategoryModal}
            onDelete={handleDeleteCategory}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
