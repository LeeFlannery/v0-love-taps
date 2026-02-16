# Love Taps

A romantic shared task manager for couples, built with Next.js 16, Tailwind CSS, and Framer Motion.

> **Psst... there's a secret.** Try tapping the little love blobs. Keep tapping. You never know when something magical might happen.

---

## What Is This?

Love Taps turns boring to-do lists into something couples actually *want* to use. Tasks are organized into three themed lists:

- **Honey-Do List** -- Chores & errands (sparkles icon)
- **Oh Baby List** -- Romance & sweet stuff (flame icon)
- **Busy Boy List** -- Work & appointments (briefcase icon)

Complete tasks, hit weekly goals, and watch fireworks explode across your screen. Literally.

## Features

- **Three themed task categories** with custom icons and color-coded sections
- **Weekly achievement system** -- complete 3 Oh Baby tasks + 1 Honey-Do task per week to trigger a celebration
- **Fireworks animation** when you hit your weekly goal
- **Animated love blob mascots** that give you positive reinforcement and have a few surprises up their sleeve
- **Smooth Framer Motion animations** on task add, complete, and delete
- **Completed task effects** with strikethrough and fade
- **Mobile-first design** with large touch-friendly buttons and cards
- **Warm romantic color scheme** -- pinks, roses, mauves, with a splash of amber
- **localStorage persistence** -- tasks and achievements survive page refreshes
- **Achievement badge** with animated progress bars tracking weekly goals

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev) for icons
- [shadcn/ui](https://ui.shadcn.com) component primitives

## Project Structure

```
app/
  layout.tsx          -- Root layout with Quicksand + Dancing Script fonts
  page.tsx            -- Entry point, renders <LoveTaps />
  globals.css         -- Romantic pink/rose design tokens

components/love-taps/
  love-taps.tsx       -- Main orchestrator component
  header.tsx          -- "Love Taps" title with pulsing background heart
  task-form.tsx       -- Task input with vertical category selector
  task-item.tsx       -- Individual task with checkbox, strikethrough, delete
  category-section.tsx -- Category header badges with throb animation + task list
  achievement-badge.tsx -- Weekly goal progress tracker with trophy
  fireworks.tsx       -- Multi-burst particle fireworks celebration
  love-blobs.tsx      -- Animated blob mascot couple with secret interactions
  empty-state.tsx     -- Friendly empty state when no tasks exist

hooks/
  use-tasks.ts        -- Task CRUD + localStorage persistence
  use-achievements.ts -- Weekly goal tracking + celebration state

lib/
  types.ts            -- Task/category type definitions and config
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start tapping.

## Credits

Made with love for you & yours
by [Lee Flannery](https://leeflannery.com)
