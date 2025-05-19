# EHR Resources Viewer

A modern web application for viewing and managing Electronic Health Record (EHR) resources using Next.js, TypeScript, and shadcn/ui.

## Features

- Display EHR resources in a sortable, filterable table
- View detailed resource information
- Real-time relative timestamps
- Dark mode UI
- Responsive design with mobile view
  - Optimized table view for mobile devices
  - Touch-friendly controls and interactions
  - Horizontal scrolling for table on small screens
  - Stacked pagination controls on mobile

## Tech Stack

- Next.js
- TypeScript
- TanStack Table
- shadcn/ui
- Tailwind CSS
- date-fns

## Installation

1. Install pnpm (if not already installed):
```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. or whatever port it opens up in

## Tech Stack Setup

### Next.js & TypeScript
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint
```

### TanStack Table
```bash
pnpm add @tanstack/react-table
```

### shadcn/ui
```bash
pnpm add -D @shadcn/ui
pnpm dlx shadcn-ui@latest init
```

### Tailwind CSS
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p
```

### date-fns
```bash
pnpm add date-fns
```

## Development

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling
- Mobile-first responsive design
- Automatic redirect from root to resources page

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "New Project"

4. Import your repository

5. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
   - Output Directory: `.next`


6. Click "Deploy"

Your application will be deployed and you'll get a URL like `your-app.vercel.app`

### Automatic Deployments

- Every push to the main branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can configure custom domains in the Vercel dashboard

