# Product Management Dashboard - Frontend

## Overview

A modern, real-time product management dashboard built with Next.js (latest), TypeScript, and Firebase Firestore.

## Tech Stack

- **Framework**: Next.js (latest, App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: ShadCN UI
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table (React Table v8)
- **Charts**: Recharts (via ShadCN)
- **Real-time Database**: Firebase
  Firestore
- **Styling**: Tailwind CSS
- **Real-time Database**: Firebase
- **Containerization**: Docker
  Testing
- **Testing**:Jest

## Features

- 🔐 JWT-based authentication with HTTP-only cookies
- 🔄 Real-time product updates via Firestore
- 📊 Interactive analytics dashboard with charts
- 📝 Form validation with React Hook Form
- 🎨 Modern, responsive UI with ShadCN components
- 🚀 Optimized data fetching with RTK Query
- 📱 Fully responsive design
- 🎨 Modern, responsive UI with ShadCN

- 🐳 Dockerized application for consistent development and deployment Query
- 🧪 Unit and integration testing with Jest

## Prerequisites

- Node.js ()
- `pnpm`
- Firebase project with Firestore enabled

- Docker and Docker Compose (for containerized setup)
- Jest (for testing)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/devshakilh/product-dashboard-frontend>
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up Firebase:
   - Go to Firebase Console
   - Create a new project or use an existing one
   - Enable Firestore Database
   - Get Firebase config from Project Settings
   - Add credentials to `.env.local`

4. Install ShadCN components:

```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button input label table dialog form select card chart
```

5. Start development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler check

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (landing)/         # Public landing routes
│   ├── dashboard/         # Protected dashboard routes
│   └── layout.tsx         # Root layout
├── features/
│   ├── auth/              # Auth-related components and logic
│   ├── dashboard/         # Dashboard-related components and logic
│   ├── ui/                # Reusable UI components
├── lib/
│   ├── firebase/          # Firebase configuration
│   ├── store/             # Redux store setup
│   │   ├── slices/        # Redux slices
│   │   └── api/           # RTK Query APIs
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
└── middleware.ts          # Next.js middleware for auth
```

## Demo Credentials

```
Email: admin@example.com
Password: admin123
```

## Key Features

### Real-time Updates

Firestore's `onSnapshot` listener enables real-time product updates in the UI.

### State Management

- **Redux Toolkit**: Manages global state
- **RTK Query**: Handles API calls, caching, and refetching

### Form Handling

- React Hook Form for efficient form management
- Zod for schema validation

### Authentication

- Login via `/login` with JWT token stored in HTTP-only cookie
- Middleware protects dashboard routes
- Token validated on protected requests

## Pages

- **Login (`/login`)**: Email/password authentication with form validation
- **Products (`/dashboard/products`)**: Real-time product table with CRUD, search, and filter
- **Analytics (`/dashboard/analytics`)**: Charts for product distribution, status, and price analysis
- **Landing (`/`)**: Public landing page

## API Integration

- **RTK Query**:
  - `authApi`: Login, logout, token verification
  - `productsApi`: Product CRUD operations
- Firestore for real-time product subscriptions

## Deployment

### Vercel (Recommended)

```bash
pnpm build
vercel --prod
```

Add environment variables in your deployment platform.

```

### CORS Errors

Ensure backend CORS allows requests from your frontend URL.

```
