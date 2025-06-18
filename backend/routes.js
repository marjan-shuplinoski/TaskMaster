import { Router } from 'express';
import { register, login, logout, me, updateProfile, registerSchema, loginSchema } from './controllers/authController.js';
import { authenticate } from './middleware/auth.js';
import { validate } from './middleware/validate.js';
import { getCategories, createCategory, updateCategory, deleteCategory } from './controllers/categoryController.js';
import { getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus } from './controllers/taskController.js';

const router = Router();

// Auth endpoints
router.post('/auth/register', validate(registerSchema), register);
router.post('/auth/login', validate(loginSchema), login);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticate, me);
router.put('/auth/updateprofile', authenticate, updateProfile);

// Tasks endpoints
router.get('/tasks', authenticate, getTasks);
router.get('/tasks/:id', authenticate, getTaskById);
router.post('/tasks', authenticate, createTask);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);
router.patch('/tasks/:id/status', authenticate, updateTaskStatus);

// Categories endpoints
router.get('/categories', authenticate, getCategories);
router.post('/categories', authenticate, createCategory);
router.put('/categories/:id', authenticate, updateCategory);
router.delete('/categories/:id', authenticate, deleteCategory);

export default router;
