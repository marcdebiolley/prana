# Portée de Prana — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a beautiful, minimal one-page Next.js site presenting Prana's imminent Border Collie litter with a mailto contact form.

**Architecture:** Single-page scroll with 7 sections (Nav, Hero, Prana, Father, Litter, Adoption, Contact, Footer), assembled in `app/page.tsx`. Each section is an isolated React component. Framer Motion handles all animations. No backend — form submits via mailto.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next/font/google (Playfair Display + Inter), Vercel deployment.

---

## Chunk 1: Project Setup & Configuration

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Create Next.js app**

```bash
cd /Users/marcodebiolley/Codes/adoption-prana
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --use-npm
```

When prompted, accept all defaults.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 3: Verify install**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000` with default Next.js page.

- [ ] **Step 4: Stop dev server (Ctrl+C)**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 + Tailwind + Framer Motion"
```

---

### Task 2: Configure Tailwind with design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F9F7F4',
        'bg-alt': '#EFEDE8',
        text: '#1C1C1A',
        accent: '#8B7355',
        'accent-hover': '#6B5A40',
        footer: '#1C1C1A',
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #F9F7F4;
  color: #1C1C1A;
  font-family: var(--font-inter), system-ui, sans-serif;
}

/* Focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #8B7355;
  box-shadow: 0 0 0 2px rgba(139, 115, 85, 0.15);
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "chore: configure Tailwind design tokens"
```

---

### Task 3: Configure layout with fonts and metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portée de Prana — Chiots Border Collie',
  description: 'Portée imminente de Prana, Border Collie brun de 6 ans. Découvrez les parents et soumettez votre candidature d\'adoption.',
  openGraph: {
    title: 'Portée de Prana — Chiots Border Collie',
    description: 'Portée imminente de Prana, Border Collie brun de 6 ans.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Prana, Border Collie brun — Portée Printemps 2026' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Add placeholder og-image**

```bash
# Copy any photo of Prana as og-image (update later with real photo)
# For now create a placeholder directory
mkdir -p public/images
touch public/images/.gitkeep
```

- [ ] **Step 3: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000` — no errors in console.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx public/
git commit -m "feat: configure layout with Playfair Display + Inter fonts and SEO metadata"
```

---

## Chunk 2: Nav & Hero

### Task 4: Build Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#prana', label: 'Prana' },
  { href: '#papa', label: 'Le papa' },
  { href: '#portee', label: 'La portée' },
  { href: '#adoption', label: 'Adoption' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(249,247,244,0.95)' : 'rgba(249,247,244,0)',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 1px 0 rgba(28,28,26,0.08)' : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-serif text-lg font-bold text-text tracking-wide"
        >
          Portée de Prana
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-text/70 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg border-t border-text/10 px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-text/80 hover:text-accent transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
```

- [ ] **Step 2: Add Nav to `app/page.tsx`**

```typescript
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Nav should be visible, sticky, and hamburger should work on mobile viewport.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add sticky Nav with scroll background transition and mobile menu"
```

---

### Task 5: Build Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/prana-hero.jpg"
          alt="Prana, Border Collie brun"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1 text-xs font-sans font-medium tracking-widest uppercase text-white/90 border border-white/40 rounded-full"
          >
            Portée imminente
          </motion.span>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-3">
            Portée de Prana
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg md:text-xl text-white/80 tracking-wide">
            Border Collie · Printemps 2026
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator — positioned above content padding to avoid overlap on small viewports */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-sans text-xs text-white/50 tracking-widest uppercase">Découvrir</span>
        <motion.div
          className="w-px h-8 bg-white/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add placeholder hero image**

```bash
# Copy one of Prana's photos to public/images/prana-hero.jpg
# The image must exist before the build — Next.js Image with fill will fail at runtime otherwise.
# Use any portrait or landscape photo of Prana for now:
cp /path/to/your/prana-photo.jpg public/images/prana-hero.jpg
# (Update the path above with the actual photo location on your machine)
```

Note: Do not use remote placeholder services — they are unreliable and will silently fail offline. Always commit a real image file.

- [ ] **Step 3: Add Hero to `app/page.tsx`**

```typescript
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Hero should be full-screen with title, badge, and scroll indicator animation. Text should be readable over the image.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/page.tsx public/images/
git commit -m "feat: add Hero section with full-screen image, animated title and scroll indicator"
```

---

## Chunk 3: Content Sections

### Task 6: Create FadeInSection animation wrapper

**Files:**
- Create: `components/FadeInSection.tsx`

- [ ] **Step 1: Create `components/FadeInSection.tsx`**

This reusable wrapper applies the standard scroll fade-in animation to any section content.

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FadeInSection({ children, className = '', delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FadeInSection.tsx
git commit -m "feat: add FadeInSection animation wrapper"
```

---

### Task 7: Build AboutPrana component

**Files:**
- Create: `components/AboutPrana.tsx`

- [ ] **Step 1: Create `components/AboutPrana.tsx`**

```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

const photos = [
  { src: '/images/prana-1.jpg', alt: 'Prana dans la nature' },
  { src: '/images/prana-2.jpg', alt: 'Portrait de Prana' },
  { src: '/images/prana-3.jpg', alt: 'Prana en promenade' },
]

export default function AboutPrana() {
  return (
    <section id="prana" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">La maman</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Prana</h2>
          <div className="w-12 h-px bg-accent mb-8" />
        </FadeInSection>

        {/* Text + gallery layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Description */}
          <FadeInSection delay={0.1}>
            <div className="space-y-4 font-sans text-text/80 leading-relaxed">
              <p>
                Prana est une Border Collie brun tricolore de 6 ans, pleine de vie, d'intelligence
                et d'affection. Son nom, emprunté au Sanskrit, signifie <em>«&nbsp;souffle vital&nbsp;»</em> —
                et elle porte ce nom à merveille.
              </p>
              <p>
                Douce avec les enfants, curieuse et équilibrée, Prana est une chienne de famille
                exceptionnelle. Elle allie l'énergie caractéristique des Border Collies à un
                tempérament calme et attentif à son foyer.
              </p>
              <p>
                À 6 ans, c'est sa première portée. Chaque chiot sera élevé dans un environnement
                familial chaleureux, socialisé dès les premiers jours.
              </p>
            </div>

            {/* Info chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                '6 ans',
                'Border Collie brun',
                'Première portée',
                'Élevage familial',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-sans font-medium text-accent border border-accent/30 rounded-full bg-accent/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeInSection>

          {/* Photo gallery */}
          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {/* Large photo */}
              <motion.div
                className="col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Small photos */}
              {photos.slice(1).map((photo) => (
                <motion.div
                  key={photo.src}
                  className="relative aspect-square rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add placeholder photos**

```bash
# Copy Prana's photos to:
# public/images/prana-1.jpg  (landscape, main photo)
# public/images/prana-2.jpg  (square crop)
# public/images/prana-3.jpg  (square crop)
# Until real photos are added, the images will show broken — that's expected.
echo "Add prana-1.jpg, prana-2.jpg, prana-3.jpg to public/images/"
```

- [ ] **Step 3: Add to `app/page.tsx`**

```typescript
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import AboutPrana from '@/components/AboutPrana'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutPrana />
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser** — section should appear on scroll with fade animation.

- [ ] **Step 5: Commit**

```bash
git add components/AboutPrana.tsx app/page.tsx
git commit -m "feat: add AboutPrana section with photo gallery and fade animations"
```

---

### Task 8: Build AboutFather component

**Files:**
- Create: `components/AboutFather.tsx`

- [ ] **Step 1: Create `components/AboutFather.tsx`**

```typescript
import FadeInSection from './FadeInSection'

// SVG silhouette of a Border Collie (side profile)
function BorderCollieIcon() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 h-32 opacity-30"
      aria-hidden="true"
    >
      {/* Simplified Border Collie silhouette */}
      <path
        d="M160 80 C165 60, 175 50, 170 40 C165 30, 155 35, 150 45
           C145 35, 135 30, 125 40 C120 50, 122 60, 118 70
           C110 65, 95 60, 80 65 C65 70, 50 80, 40 95
           C30 110, 35 125, 45 130 C55 135, 60 125, 65 115
           C70 105, 75 100, 80 100 C90 100, 95 110, 100 120
           C105 130, 115 135, 125 130 C135 125, 130 115, 128 105
           C135 100, 145 95, 155 90 C165 85, 168 82, 160 80Z"
        fill="#8B7355"
      />
      {/* Tail */}
      <path
        d="M155 90 C165 85, 180 75, 190 60 C185 58, 178 65, 168 72 C162 77, 158 83, 155 90Z"
        fill="#8B7355"
      />
    </svg>
  )
}

export default function AboutFather() {
  return (
    <section id="papa" className="bg-bg-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Le papa</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Le Border Collie noir</h2>
          <div className="w-12 h-px bg-accent mb-8" />
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Silhouette */}
          <FadeInSection delay={0.1}>
            <div className="flex items-center justify-center h-64 rounded-2xl bg-bg border border-text/5">
              <div className="text-center">
                <BorderCollieIcon />
                <p className="font-sans text-sm text-text/40 mt-4 tracking-wide">Photo à venir</p>
              </div>
            </div>
          </FadeInSection>

          {/* Description */}
          <FadeInSection delay={0.2}>
            <div className="space-y-4 font-sans text-text/80 leading-relaxed">
              <p>
                Le père de la portée est un magnifique Border Collie noir, sélectionné pour son
                caractère équilibré et ses qualités sportives.
              </p>
              <p>
                L'association d'un Border Collie brun et d'un Border Collie noir promet des chiots
                aux robes variées — potentiellement brun tricolore, noir tricolore ou merle —
                tous porteurs de l'intelligence et de l'énergie propres à la race.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Border Collie noir',
                'Caractère équilibré',
                'Race pure',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-sans font-medium text-accent border border-accent/30 rounded-full bg-accent/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```typescript
import AboutFather from '@/components/AboutFather'
// Add after AboutPrana
```

- [ ] **Step 3: Verify in browser** — alternating background `#EFEDE8` should contrast with previous section.

- [ ] **Step 4: Commit**

```bash
git add components/AboutFather.tsx app/page.tsx
git commit -m "feat: add AboutFather section with SVG silhouette"
```

---

### Task 9: Build Litter component

**Files:**
- Create: `components/Litter.tsx`

- [ ] **Step 1: Create `components/Litter.tsx`**

```typescript
import FadeInSection from './FadeInSection'

const facts = [
  {
    icon: '🧠',
    title: 'Intelligence exceptionnelle',
    desc: 'Le Border Collie est souvent classé première race la plus intelligente au monde. Il apprend des ordres en quelques répétitions.',
  },
  {
    icon: '⚡',
    title: 'Énergie & sport',
    desc: 'Race de berger à l\'origine, le Border Collie a besoin d\'au moins 2h d\'activité par jour. Idéal pour les familles actives.',
  },
  {
    icon: '❤️',
    title: 'Fidélité & affection',
    desc: 'Très attaché à sa famille, le Border Collie est doux, loyal et excellent avec les enfants lorsqu\'il est bien socialisé.',
  },
  {
    icon: '🎨',
    title: 'Robes possibles',
    desc: 'L\'union de Prana (brun) et du papa (noir) peut donner des chiots brun tricolore ou noir tricolore, aux yeux souvent clairs.',
  },
]

export default function Litter() {
  return (
    <section id="portee" className="bg-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">La portée</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-3">Printemps 2026</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-sans font-semibold text-white bg-accent rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
              Portée imminente
            </span>
          </div>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        {/* Facts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <FadeInSection key={fact.title} delay={i * 0.1}>
              <div className="bg-bg-alt rounded-2xl p-6 h-full">
                <span className="text-2xl mb-4 block">{fact.icon}</span>
                <h3 className="font-serif text-lg font-bold text-text mb-2">{fact.title}</h3>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{fact.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/Litter.tsx app/page.tsx
git commit -m "feat: add Litter section with Border Collie fact cards"
```

---

### Task 10: Build AdoptionInfo component

**Files:**
- Create: `components/AdoptionInfo.tsx`

- [ ] **Step 1: Create `components/AdoptionInfo.tsx`**

```typescript
import FadeInSection from './FadeInSection'

const criteria = [
  { label: 'Famille active', desc: 'Vous pratiquez sport, randonnée ou avez un mode de vie dynamique.' },
  { label: 'Espace extérieur', desc: 'Jardin ou accès facile à des espaces verts pour les promenades quotidiennes.' },
  { label: 'Disponibilité', desc: 'Vous pouvez consacrer du temps et de l\'attention à votre chien au quotidien.' },
  { label: 'Engagement long terme', desc: 'Vous êtes prêt(e) à vous engager pour les 12 à 15 ans de vie de votre Border Collie.' },
  { label: 'Stimulation mentale', desc: 'Vous souhaitez pratiquer un sport canin, de l\'agility ou du training régulier.' },
]

export default function AdoptionInfo() {
  return (
    <section id="adoption" className="bg-bg-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Adoption</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">Ce que nous recherchons</h2>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Criteria */}
          <FadeInSection delay={0.1}>
            <ul className="space-y-5">
              {criteria.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </span>
                  <div>
                    <p className="font-sans font-medium text-text">{item.label}</p>
                    <p className="font-sans text-sm text-text/60 mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeInSection>

          {/* Process */}
          <FadeInSection delay={0.2}>
            <div className="bg-bg rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-text mb-4">Le processus</h3>
              <ol className="space-y-4">
                {[
                  'Soumettez votre candidature via le formulaire',
                  'Nous étudions votre dossier avec soin',
                  'Nous vous recontactons par email ou téléphone',
                  'Une rencontre avec Prana et les chiots est organisée',
                  'Remise du chiot accompagné de ses documents',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-sans font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="font-sans text-sm text-text/70 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/AdoptionInfo.tsx app/page.tsx
git commit -m "feat: add AdoptionInfo section with criteria list and process steps"
```

---

## Chunk 4: Contact Form & Footer

### Task 11: Build ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Create `components/ContactForm.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeInSection from './FadeInSection'

interface FormData {
  nom: string
  email: string
  telephone: string
  logement: string
  jardin: string
  enfants: string
  animaux: string
  experience: string
  motivation: string
}

const initialForm: FormData = {
  nom: '',
  email: '',
  telephone: '',
  logement: '',
  jardin: '',
  enfants: '',
  animaux: '',
  experience: '',
  motivation: '',
}

function buildMailto(data: FormData): string {
  const subject = encodeURIComponent(`Candidature adoption — ${data.nom}`)
  const body = encodeURIComponent(
    `Prénom & Nom : ${data.nom}\n` +
    `Email : ${data.email}\n` +
    `Téléphone : ${data.telephone || 'Non renseigné'}\n` +
    `Logement : ${data.logement}\n` +
    `Jardin : ${data.jardin}\n` +
    `Enfants : ${data.enfants}\n` +
    `Autres animaux : ${data.animaux || 'Aucun'}\n` +
    `Expérience avec les chiens : ${data.experience}\n` +
    `\nMotivation :\n${data.motivation}`
  )
  return `mailto:marcdebiolley@gmail.com?cc=muriel.vanhavre@gmail.com&subject=${subject}&body=${body}`
}

function isValid(data: FormData): boolean {
  return !!(
    data.nom.trim() &&
    data.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) &&
    data.logement &&
    data.jardin &&
    data.enfants &&
    data.experience &&
    data.motivation.trim().length >= 100
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-text/15 bg-white font-sans text-sm text-text placeholder:text-text/30 transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none'

const labelClass = 'block font-sans text-sm font-medium text-text/80 mb-2'

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const valid = isValid(form)

  return (
    <section id="contact" className="bg-bg py-24 px-6">
      <div className="max-w-3xl mx-auto">

        <FadeInSection>
          <p className="font-sans text-xs tracking-widest uppercase text-accent mb-3">Candidature</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text mb-6">
            Soumettre ma candidature
          </h2>
          <div className="w-12 h-px bg-accent mb-12" />
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (valid) window.location.href = buildMailto(form)
            }}
            noValidate
            className="space-y-6"
          >
            {/* Nom */}
            <div>
              <label htmlFor="nom" className={labelClass}>Prénom & Nom *</label>
              <input id="nom" type="text" required value={form.nom} onChange={set('nom')} className={inputClass} placeholder="Marie Dupont" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input id="email" type="email" required value={form.email} onChange={set('email')} className={inputClass} placeholder="marie@exemple.com" />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className={labelClass}>Téléphone <span className="text-text/40 font-normal">(optionnel)</span></label>
              <input id="telephone" type="tel" value={form.telephone} onChange={set('telephone')} className={inputClass} placeholder="06 00 00 00 00" />
            </div>

            {/* Logement */}
            <div>
              <label htmlFor="logement" className={labelClass}>Type de logement *</label>
              <select id="logement" required value={form.logement} onChange={set('logement')} className={inputClass}>
                <option value="">Sélectionner...</option>
                <option value="Maison">Maison</option>
                <option value="Appartement">Appartement</option>
                <option value="Ferme / propriété">Ferme / propriété</option>
              </select>
            </div>

            {/* Jardin */}
            <div>
              <label className={labelClass}>Jardin ou espace extérieur privatif ? *</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="jardin"
                      value={opt}
                      checked={form.jardin === opt}
                      onChange={set('jardin')}
                      className="accent-accent"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Enfants */}
            <div>
              <label className={labelClass}>Enfants à la maison ? *</label>
              <div className="flex gap-4">
                {['Oui', 'Non'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="enfants"
                      value={opt}
                      checked={form.enfants === opt}
                      onChange={set('enfants')}
                      className="accent-accent"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Autres animaux */}
            <div>
              <label htmlFor="animaux" className={labelClass}>Autres animaux <span className="text-text/40 font-normal">(optionnel)</span></label>
              <input id="animaux" type="text" value={form.animaux} onChange={set('animaux')} className={inputClass} placeholder="Ex : un chat, un autre chien..." />
            </div>

            {/* Expérience */}
            <div>
              <label className={labelClass}>Expérience avec les chiens *</label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'Débutant', label: 'Débutant — premier chien' },
                  { value: 'Expérimenté', label: 'Expérimenté — j\'ai déjà eu des chiens' },
                  { value: 'Border Collie', label: 'J\'ai déjà eu un Border Collie' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value={opt.value}
                      checked={form.experience === opt.value}
                      onChange={set('experience')}
                      className="accent-accent"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className={labelClass}>
                Votre motivation *
                <span className="ml-2 text-text/40 font-normal">
                  ({form.motivation.length}/100 caractères minimum)
                </span>
              </label>
              <textarea
                id="motivation"
                required
                rows={6}
                value={form.motivation}
                onChange={set('motivation')}
                className={inputClass}
                placeholder="Pourquoi souhaitez-vous adopter un chiot de Prana ? Décrivez votre mode de vie, vos projets avec votre futur Border Collie..."
              />
            </div>

            {/* Submit */}
            <div>
              <motion.button
                type="submit"
                disabled={!valid}
                whileTap={valid ? { scale: 0.97 } : {}}
                className={`w-full py-4 rounded-xl font-sans font-medium text-sm tracking-wide transition-all duration-200 ${
                  valid
                    ? 'bg-accent text-white hover:bg-accent-hover cursor-pointer'
                    : 'bg-text/10 text-text/30 cursor-not-allowed'
                }`}
              >
                Envoyer ma candidature
              </motion.button>

              {/* Mobile fallback */}
              <p className="mt-3 text-center font-sans text-xs text-text/40">
                Si le lien ne s'ouvre pas,{' '}
                <a
                  href="mailto:marcdebiolley@gmail.com"
                  className="text-accent hover:text-accent-hover underline underline-offset-2"
                >
                  envoyez directement un email
                </a>
              </p>
            </div>

            {/* GDPR */}
            <p className="font-sans text-xs text-text/40 text-center leading-relaxed border-t border-text/10 pt-4">
              Vos informations sont utilisées uniquement pour traiter votre candidature
              et ne sont pas conservées au-delà de cette démarche.
            </p>

          </form>
        </FadeInSection>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

- [ ] **Step 3: Verify the mailto URL**

Fill the form in browser, click submit. Verify the email client opens with:
- To: `marcdebiolley@gmail.com`
- CC: `muriel.vanhavre@gmail.com`
- Subject: `Candidature adoption — [name]`
- Body with all fields populated

- [ ] **Step 4: Verify button is disabled when form is incomplete**

- [ ] **Step 5: Commit**

```bash
git add components/ContactForm.tsx app/page.tsx
git commit -m "feat: add ContactForm with mailto, validation, GDPR notice and mobile fallback"
```

---

### Task 12: Build Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```typescript
export default function Footer() {
  return (
    <footer className="bg-footer py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Brand */}
          <div>
            <p className="font-serif text-xl font-bold text-white/90">Portée de Prana</p>
            <p className="font-sans text-xs text-white/30 mt-1 tracking-wide">Élevage particulier non-LOOF</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:marcdebiolley@gmail.com"
              className="font-sans text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              marcdebiolley@gmail.com
            </a>
            <a
              href="tel:+32474722414"
              className="font-sans text-sm text-white/60 hover:text-white/90 transition-colors"
            >
              0474 72 24 14
            </a>
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-white/20">
            © 2026 Portée de Prana
          </p>

        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx` — final version**

```typescript
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import AboutPrana from '@/components/AboutPrana'
import AboutFather from '@/components/AboutFather'
import Litter from '@/components/Litter'
import AdoptionInfo from '@/components/AdoptionInfo'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutPrana />
      <AboutFather />
      <Litter />
      <AdoptionInfo />
      <ContactForm />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Full page smoke test**

```bash
npm run dev
```

Scroll through the entire page. Verify:
- All sections present and correctly ordered
- Section backgrounds alternate correctly
- Animations trigger on scroll
- Footer is dark

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer and assemble complete one-page layout"
```

---

## Chunk 5: Photos & Deployment

### Task 13: Add real photos

**Files:**
- Modify: `public/images/`

- [ ] **Step 1: Add Prana's photos to `public/images/`**

Required files:
- `prana-hero.jpg` — landscape, ideally 1920×1080 or wider (hero background)
- `prana-1.jpg` — landscape 4:3 ratio (main gallery photo)
- `prana-2.jpg` — square or portrait (gallery)
- `prana-3.jpg` — square or portrait (gallery)
- `og-image.jpg` — exactly 1200×630 (for social sharing preview)

Tip: use macOS Preview or [squoosh.app](https://squoosh.app) to resize/crop photos. Keep files under 500KB each for fast loading.

- [ ] **Step 2: Verify photos load correctly**

```bash
npm run dev
```

Open `http://localhost:3000`. Check hero image and gallery fill their containers properly.

- [ ] **Step 3: Commit photos**

```bash
git add public/images/
git commit -m "feat: add Prana's photos"
```

---

### Task 14: Production build & deploy

**Files:**
- No code changes — verification only

- [ ] **Step 1: Run production build locally**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. No type errors. No lint errors.

- [ ] **Step 2: Preview production build**

```bash
npm start
```

Open `http://localhost:3000`. Verify full page, animations, form.

- [ ] **Step 3: Deploy to Vercel**

```bash
npm install -g vercel
vercel
```

Follow prompts:
- Set up and deploy: `Y`
- Which scope: your account
- Link to existing project: `N`
- Project name: `portee-de-prana`
- Directory: `./`

- [ ] **Step 4: Open live URL**

Vercel will output a URL like `https://portee-de-prana.vercel.app`. Open it, verify everything works.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: production build verified and deployed to Vercel"
```

---

## Summary

| Task | Component | Status |
|------|-----------|--------|
| 1 | Project scaffold | — |
| 2 | Tailwind tokens | — |
| 3 | Layout + fonts | — |
| 4 | Nav | — |
| 5 | Hero | — |
| 6 | FadeInSection | — |
| 7 | AboutPrana | — |
| 8 | AboutFather | — |
| 9 | Litter | — |
| 10 | AdoptionInfo | — |
| 11 | ContactForm | — |
| 12 | Footer | — |
| 13 | Photos | — |
| 14 | Deploy | — |
