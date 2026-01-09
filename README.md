# Quiz Builder

Test task for DevelopsToday

## Overview

Quiz Builder is a full-stack web application for creating and managing quizzes. The application allows users to register, authenticate, create quizzes with various question types, and view quizzes created by other users.

## Technology Stack

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL (Sequelize ORM)
- JWT authentication with refresh tokens
- Zod for validation
- Docker for database containerization

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- SCSS Modules
- React Hook Form with Zod validation
- TanStack Query (React Query)
- Lucide React icons

## Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd quiz-builder
```

### 2. Backend Setup

```bash
cd back-end

# Install dependencies
yarn install

# Create .env file with the following variables:
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=quiz_builder
# DB_HOST=localhost
# DB_PORT=5432
# JWT_ACCESS_SECRET=your-access-secret-key
# JWT_REFRESH_SECRET=your-refresh-secret-key
# PORT=3001

# Start PostgreSQL database using Docker
docker-compose up -d

# Run database migrations and seed data (optional)
yarn seed

# Start development server
yarn dev
```

The backend API will be available at `http://localhost:3001`

### 3. Frontend Setup

```bash
cd front-end

# Install dependencies
yarn install

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start development server
yarn dev
```

The frontend application will be available at `http://localhost:3000`

## Architecture

### Backend Architecture

The backend follows a layered architecture pattern with clear separation of concerns:

**Project Structure:**
```
back-end/
├── src/
│   ├── endpoints/           # Feature modules
│   │   ├── auth/           # Authentication endpoints
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── services/   # Business logic
│   │   │   ├── schemas/    # Zod validation schemas
│   │   │   ├── types/      # TypeScript type definitions
│   │   │   └── routes.ts   # Route definitions
│   │   ├── quiz/           # Quiz management endpoints
│   │   └── user/           # User-related endpoints
│   ├── lib/
│   │   ├── middlewares/    # Express middlewares
│   │   ├── types/          # Shared types
│   │   └── utils/          # Utility functions
│   ├── models/             # Sequelize models
│   ├── db.ts              # Database connection
│   └── main.ts            # Application entry point
```

**Key Design Patterns:**

- **Controller-Service Pattern:** Controllers handle HTTP requests/responses, services contain business logic
- **Middleware Chain:** Authentication, validation, and error handling middlewares
- **Repository Pattern:** Sequelize models act as repositories for data access
- **JWT Token Strategy:** Access tokens (short-lived) + Refresh tokens (long-lived) stored in HTTP-only cookies

**Authentication Flow:**
1. User registers/logs in with credentials
2. Server issues access token (15min) and refresh token (7days)
3. Refresh token stored in HTTP-only cookie
4. Access token included in Authorization header
5. Auth middleware validates tokens on protected routes
6. Automatic token refresh using refresh endpoint

### Frontend Architecture

The frontend uses Next.js App Router with a feature-based structure:

**Project Structure:**
```
front-end/
├── app/                    # Next.js App Router pages
│   ├── (navigation)/       # Layout group with navigation
│   │   ├── (only-guest)/  # Guest-only routes (login, register)
│   │   └── quizzes/       # Quiz routes
│   └── layout.tsx         # Root layout
├── lib/
│   ├── api/               # API client and hooks
│   ├── components/        # Reusable components
│   ├── features/          # Feature modules
│   │   ├── Auth/         # Authentication feature
│   │   ├── Navbar/       # Navigation feature
│   │   └── Quiz/         # Quiz feature
│   │       ├── components/ # Quiz-specific components
│   │       ├── ui/        # UI components for quiz
│   │       └── widgets/   # Complex composed components
│   ├── guards/            # Route guards
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript definitions
```

**Key Design Patterns:**

- **Feature-Sliced Design:** Code organized by features, not technical layers
- **Component Composition:** Small, reusable components composed into larger widgets
- **Context + Hooks:** React Context for auth state, custom hooks for data fetching
- **Form Management:** React Hook Form with Zod schema validation
- **Server/Client Components:** Strategic use of Next.js server/client components
- **API Layer Abstraction:** Centralized API client with automatic token refresh

**State Management:**
- **Authentication:** React Context with persistent state
- **Server State:** TanStack Query for caching and synchronization
- **Form State:** React Hook Form with controlled/uncontrolled inputs
- **Local State:** useState for component-specific state with debouncing

**Data Flow:**
1. User interaction triggers component event
2. Component calls API hook from TanStack Query
3. Hook uses centralized API client
4. Client handles auth tokens, request/response formatting
5. Response cached and returned to component
6. Component re-renders with new data

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Quiz
- `GET /api/quiz` - Get all quizzes (paginated)
- `GET /api/quiz/:id` - Get single quiz by ID
- `POST /api/quiz` - Create new quiz (authenticated)

### User
- `GET /api/user/me` - Get current user profile (authenticated)
- `GET /api/user/quizzes` - Get user's created quizzes (authenticated)
- `DELETE /api/user/quizzes/:id` - Delete user's quiz (authenticated)

## Features

- User registration and authentication with JWT
- Create quizzes with multiple question types:
  - Multiple choice (single or multiple correct answers)
  - True/False questions
  - Text input questions
- View all public quizzes
- Manage personal quizzes
- Responsive design with mobile-friendly navigation
- Protected routes with authentication guards
- Form validation on client and server
- Optimized input handling to prevent focus loss

## Scripts

### Backend
- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn seed` - Seed database with test data

### Frontend
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Development Notes

- The backend requires PostgreSQL to be running via Docker Compose
- Frontend and backend must run simultaneously for full functionality
- CORS is configured to allow requests from the frontend origin
- JWT secrets should be strong random strings in production
- Database migrations are handled automatically by Sequelize sync
