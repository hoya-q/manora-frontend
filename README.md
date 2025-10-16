# Manora - Next.js Application

Manora is a productivity app that condenses lectures, photos, documents, and more into personalized audio briefs. This project has been migrated from Vite + React to Next.js with TypeScript.

## Features

- **Multi-language Support**: English, Korean, and Japanese
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Dark theme with gradient backgrounds and smooth animations
- **Interactive Components**: Voice command simulation, language switching, mobile menu
- **SEO Optimized**: Next.js App Router with proper meta tags

## Tech Stack

- **Framework**: Next.js 15.1.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: i18next with react-i18next
- **Icons**: Remix Icons
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   └── privacy-terms/     # Privacy & Terms page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── LanguageDropdown.tsx # Language switcher
│   └── I18nProvider.tsx  # i18n context provider
├── lib/                   # Utility libraries
│   └── i18n.ts           # i18n configuration
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Internationalization

The app supports three languages:

- English (en) - Default
- Korean (ko)
- Japanese (jp)

Language switching is handled by i18next and persists user selection in localStorage.

## Styling

The project uses Tailwind CSS for styling with custom animations and responsive design. Key features:

- Dark theme with gradient backgrounds
- Smooth transitions and hover effects
- Mobile-first responsive design
- Custom scrollbar styling
- Backdrop blur effects

## Migration Notes

This project was migrated from:

- Vite → Next.js 15
- React Router → Next.js App Router
- HTML pages → React components
- Vanilla JavaScript → TypeScript
- Separate CSS files → Tailwind CSS

## Deployment

The app can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Self-hosted with Node.js

## License

© ArtygenSpace. All rights reserved.
