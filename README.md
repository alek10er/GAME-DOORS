# Light Rays Hero (React + Vite + Tailwind + shadcn/ui)

Готовый одностраничный проект на **JavaScript** с:
- Vite + React
- TailwindCSS
- shadcn/ui-компонентами (Button, Card)
- WebGL-фоном Light Rays (ReactBits-совместимый API по props)

## Project structure

```text
.
├─ src/
│  ├─ components/
│  │  ├─ Hero.jsx
│  │  ├─ LightRays.jsx
│  │  └─ ui/
│  │     ├─ button.jsx
│  │     └─ card.jsx
│  ├─ lib/
│  │  └─ utils.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## React Bits Light Rays install hint

Если компонент доступен через shadcn CLI, можно использовать:

```bash
npx shadcn@latest add @react-bits/LightRays-JS-CSS
```

## Commands

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

## Quick start

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

Далее публикуйте содержимое `dist/` на любом статическом хостинге (Vercel, Netlify, GitHub Pages и т.д.).


## Vercel note

For Vercel deployment, ensure the project uses:

- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Do **not** use `npm run dev` as an install/build command in CI.


## Light Rays implementation note

This project ships a local `LightRays` component implementation based on the ReactBits shader setup (OGL renderer + props API), so visuals and behavior are closer to the original preview.
