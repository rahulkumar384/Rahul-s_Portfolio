# Rahul Kumar Portfolio

A modern, animated portfolio for Rahul Kumar, focused on backend engineering, fintech systems, AI-assisted development, and production-grade software delivery.

The site is built with React, TypeScript, Tailwind CSS, Framer Motion, and a WebGL hero scene powered by Three.js.

## Highlights

- Immersive 3D hero section with animated particles, neon rings, and motion effects.
- Professional experience timeline for fintech and core banking work.
- Skills grouped by frontend, backend, tools, and databases.
- Project cards with impact summaries and detailed modal views.
- Contact form that opens the user's mail client with a prepared message.
- Vercel-ready configuration included.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run typecheck
```

Runs TypeScript checks without emitting files.

## Deploy on Vercel

This repository includes `vercel.json`, so Vercel can deploy it as a static Vite app.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Deployment steps:

1. Push this repository to GitHub.
2. Open Vercel and choose `Add New Project`.
3. Import the GitHub repository.
4. Keep the default Vite settings or use the settings above.
5. Click `Deploy`.

## Project Structure

```text
src/
  components/      Reusable page sections and 3D UI pieces
  data/            Portfolio content and profile data
  hooks/           Shared React hooks
  App.tsx          Main page composition
  main.tsx         React entry point
```

## Contact

- Email: rahuldeewan384@gmail.com
- GitHub: [rahulkumar384](https://github.com/rahulkumar384)
- LinkedIn: [Rahul Kumar](https://linkedin.com/in/rahool-kumar-22392620)
