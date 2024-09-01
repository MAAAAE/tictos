# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## 설명

- layouts
  - page의 layout입니다. top, left menu가 포함되어있습니다
  - 만약 route path를 새로 구현한다면 utils/navLinks.ts에 추가하세요. 왼쪽 메뉴바에 추가됩니다.
  - 각 pages/\*/\*.vue file내에 `<NuxtLayout></NuxtLayout>` 을 `<template>` 의 자식으로 추가하면 레이아웃이 그려집니다
  - 로그인 화면에는 레이아웃을 추가안할 생각입니다. 단순로그인폼
- pages
    - 아래 규칙을 따릅니다
    - posts/[id].vue는 `/posts/[id]` uri param으로 매핑되어 그려집니다.

```
| pages/
---| about.vue
---| index.vue
---| posts/
-----| [id].vue
```

- public
  - [Document](https://nuxt.com/docs/getting-started/assets)
  - public은 정적자원의 리소스 서버로 활용됩니다
  - `public/img/`에 이미지를 넣으면 html에서는 아래처럼 가져올 수 있습니다

```vue
<template>
  <img src="/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```
