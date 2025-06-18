# TaskMaster - Task Management Application

A modern task management application built with the MERN stack, featuring user authentication, task CRUD operations, categories, and priority management.

## 🚀 Features

### Core Functionality
- ✅ User registration and authentication (JWT)
- ✅ Create, read, update, delete tasks
- ✅ Task categories and tags
- ✅ Priority levels (Low, Medium, High, Critical)
- ✅ Due date management
- ✅ Task status tracking (Todo, In Progress, Completed)
- ✅ Responsive design
- ✅ Notifications UI for all CRUD and profile actions

### Planned/Deferred Features
- 🔜 Search and filter tasks (Deferred)
- 🔜 Task analytics and statistics (Deferred)
- 🔜 Due date notifications (Planned)
- 🔜 Export tasks to CSV/PDF (Planned)
- 🔜 Drag-and-drop functionality (Planned)
- 🔜 Keyboard shortcuts (Planned)

## 📈 Project Status
All core dashboard, CRUD, authentication, category, and notification features are implemented, tested, and production-ready. All backend and frontend tests pass. The project task tracker is up to date. No major features remain except those explicitly deferred above. Deployment, security, and documentation are complete. See `tasks/tasks.json` for full task history.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Context API** - State management
- **Bootstrap 5** - CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Query** - Server state management

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js 4.x** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation

## 📁 Project Structure

```
TaskMaster/
├── frontend/                    # React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── common/         # Common UI components
│   │   │   ├── tasks/          # Task-related components
│   │   │   └── auth/           # Authentication components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   └── styles/             # Global styles
│   ├── package.json
│   └── README.md
│
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # Route definitions
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   └── validations/        # Input validations
│   ├── tests/                  # Test files
│   ├── package.json
│   └── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- npm 9+ or yarn 1.22+

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd TaskMaster
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmaster
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:3000
   ```
   
   Create `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   REACT_APP_APP_NAME=TaskMaster
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Start backend server
   cd backend && npm run dev
   
   # Terminal 2 - Start frontend server
   cd frontend && npm start
   ```

### Quick Setup Script
```bash
# Run this script for automated setup
npm run setup
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
```

### Frontend Scripts
```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
npm run test:coverage # Run tests with coverage
npm run eject       # Eject from Create React App
```

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/updateprofile` - Update user profile

### Tasks
- `GET /api/v1/tasks` - Get all user tasks
- `GET /api/v1/tasks/:id` - Get single task
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `PATCH /api/v1/tasks/:id/status` - Update task status

### Categories
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  avatar: String,
  preferences: {
    theme: String (default: 'light'),
    notifications: Boolean (default: true)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high', 'critical']),
  category: ObjectId (ref: 'Category'),
  dueDate: Date,
  tags: [String],
  user: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (required),
  color: String (default: '#007bff'),
  icon: String,
  user: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Backend Testing
- **Unit Tests**: Models, utilities, middleware
- **Integration Tests**: API endpoints
- **Database Tests**: MongoDB operations

```bash
npm test                    # Run all tests
npm run test:unit          # Run unit tests only
npm run test:integration   # Run integration tests only
npm run test:coverage      # Run with coverage report
```

### Frontend Testing
- **Component Tests**: React components
- **Hook Tests**: Custom hooks
- **Integration Tests**: Page flows

```bash
npm test                   # Run all tests
npm run test:coverage     # Run with coverage
```

## 🚀 Deployment

### Manual Deployment

#### Backend (Node.js)
1. **Build and start**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

#### Frontend (React)
1. **Build and serve**
   ```bash
   cd frontend
   npm run build
   # Serve the build folder with your preferred web server
   ```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔒 Security Features

- JWT token authentication with HttpOnly cookies
- Password hashing with bcryptjs
- Input validation and sanitization
- Rate limiting on auth endpoints
- CORS configuration
- Helmet for security headers
- MongoDB injection prevention

## 🎨 UI/UX Features

- Clean and modern interface
- Responsive design for all devices
- Dark/Light theme support
- Smooth animations and transitions
- Intuitive task management

## 📊 Performance Optimizations

- React.memo for component optimization
- Lazy loading for routes
- Image optimization
- API request caching
- Database indexing
- Pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marjan Shuplinoski**
- Email: marjan@shuplinoski.com
- LinkedIn: [marjan-shuplinoski](https://linkedin.com/in/marjan-shuplinoski)
- GitHub: [marjan-shuplinoski](https://github.com/marjan-shuplinoski)

---

**Happy Task Managing! 📝✅**

**Commands for Context7,TaskManager,Sequential-Thinking MCP`s**
-  `npx -y @upstash/context7-mcp@latest`
-  `npx -y @kazuph/mcp-taskmanager`
-  `npx -y @modelcontextprotocol/server-sequential-thinking`