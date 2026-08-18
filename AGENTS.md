# Repository Guidelines

<<<<<<< HEAD
=======
<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history—do not force-push, rebase, amend, or squash commits that
> are already pushed. Pushed commits sync back to Lovable, so keep the connected
> branch in a working state.

<!-- LOVABLE:END -->

>>>>>>> d8531a3 (Fix: Unbalanced JSX tags in CalendarPage)
## Project Structure & Module Organization

This is a React 19, TypeScript, and TanStack Start site. File-based routes live in `src/routes/`; English pages use names such as `about.tsx`, while Arabic equivalents use `ar.about.tsx`. Shared page composition belongs in `src/components/site/`, reusable primitives in `src/components/ui/`, translations in `src/i18n/`, and helpers in `src/lib/` or `src/hooks/`. Store imported images in `src/assets/` and static files in `public/`. Do not edit `src/routeTree.gen.ts`; TanStack Router regenerates it.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependencies recorded in `package-lock.json`.
- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` creates the production SSR bundle and catches build-time errors.
- `npm run build:dev` builds using development-mode configuration.
- `npm run preview` serves the built application locally.
- `npm run lint` runs ESLint, including Prettier checks.
- `npm run format` applies Prettier formatting across the repository.

Use npm for contributor workflows so the committed npm lockfile stays authoritative.

## Coding Style & Naming Conventions

Use two-space indentation, double quotes, semicolons, and trailing commas as produced by Prettier. Keep TypeScript strict and prefer the `@/` alias for imports from `src`. Name React components and their files in PascalCase (`InquiryForm.tsx`), hooks with `use...`, and utilities with concise lowercase or kebab-case names. Keep user-facing copy in `src/i18n/en.ts` and `src/i18n/ar.ts`; preserve locale-aware navigation and both LTR and RTL layouts.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Before submitting changes, run `npm run lint` and `npm run build`, then manually verify affected English and Arabic routes at desktop and mobile widths. Check navigation, forms, metadata, keyboard focus, and RTL alignment. If tests are introduced, colocate them as `*.test.ts` or `*.test.tsx` and add the runner to `package.json`.

## Commit & Pull Request Guidelines

Recent history favors short, imperative summaries such as `fix text` and `change email`; use clearer, specific wording such as `Fix Arabic mobile navigation`. Keep commits focused and buildable. Pull requests should explain the user-visible result, list verification performed, link relevant issues, and include before/after screenshots for UI work. Call out translation, configuration, or deployment impacts explicitly.

## Lovable Integration

This repository is connected to Lovable. Do not rewrite published history: avoid force-pushing, rebasing, amending, or squashing commits that have already been pushed. Keep the connected branch buildable because pushed commits synchronize back to Lovable.
