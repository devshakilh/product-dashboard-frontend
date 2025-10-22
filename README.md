# Managment Frontend

Modern frontend for the Managmentt platform built with Next.js and TypeScript.

## Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Pulikidz/Managmentt-frontend.git
   cd Managmentt-frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm lint:fix` - Run ESLint and automatically fix issues
- `pnpm type-check` - Check TypeScript types
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm format` - Format code with Prettier
- `pnpm storybook` - Run the storybook ui

## Project Structure

```
Managmentt-frontend/
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   ├── assets/         # Assets imported in code
│   ├── features/       # Feature-based modules
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Localization configs
│   ├── lib/            # Custom libraries
│   ├── locales/        # Localization files
│   ├── services/       # API and service integrations
│   ├── types/          # TypeScript type definitions
├── .eslintrc.js        # ESLint configuration
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXTAUTH_SECRET=Abc123
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.Managmentt.xyz/api/v1
```

## WebSocket Configuration

WebSocket connections are configured to automatically reconnect on failure. The default URL for the messaging WebSocket is `wss://api.Managmentt.xyz/messaging`.
