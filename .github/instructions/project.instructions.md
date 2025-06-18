---
applyTo: '**'
---

# TaskMaster Project Instructions

## Features
- User authentication (JWT)
- Task CRUD (create, read, update, delete)
- Categories, tags, priority, due dates, status tracking
- Search, filter, analytics, notifications
- Responsive, mobile-friendly UI with dark/light theme

## Tech Stack
- Frontend: React 18, React Router 6, Context API, Bootstrap 5, Axios, React Hook Form, React Query
- Backend: Node.js 18+, Express.js 4.x, MongoDB, Mongoose, JWT, bcryptjs, Joi

## Project Structure
- `frontend/`: React app (components, contexts, hooks, pages, services, utils, styles)
- `backend/`: Express API (config, controllers, middleware, models, routes, services, utils, validations, tests)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- npm 9+ or yarn 1.22+

### Installation
```sh
cd TaskMaster
cd backend && npm install
cd ../frontend && npm install
```

### Environment Setup

**backend/.env**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_APP_NAME=TaskMaster
```

### Start Development Servers
```sh
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

## Scripts

**Backend**
- `npm run dev` - Start dev server (nodemon)
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

**Frontend**
- `npm start` - Start dev server
- `npm run build` - Build for production
- `npm test` - Run tests

**Setup**
`cd backend && npm install` - Install backend dependencies
`cd ../frontend && npm install` - Install frontend dependencies


## API Endpoints

**Auth**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `PUT /api/v1/auth/updateprofile`

**Tasks**
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `POST /api/v1/tasks`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id/status`

**Categories**
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`

## Database Models

**User**
- name, email, password, avatar, preferences, createdAt, updatedAt

**Task**
- title, description, status, priority, category, dueDate, tags, user, createdAt, updatedAt

**Category**
- name, color, icon, user, createdAt, updatedAt

## Testing

**Backend**
- `npm test` - All tests
- `npm run test:unit` - Unit tests
- `npm run test:integration` - Integration tests

**Frontend**
- `npm test` - All tests

## Deployment

**Backend**
```sh
cd backend
npm install --production
npm start
```

**Frontend**
```sh
cd frontend
npm run build
```

## Security
- JWT auth, HttpOnly cookies
- bcryptjs password hashing
- Input validation/sanitization
- Rate limiting, CORS, Helmet, MongoDB injection prevention

## Contributing
- Fork, branch, commit, push, PR

## Documentation

See [README.md](../../README.md) for full project setup, usage, and contribution guidelines.

## License
MIT