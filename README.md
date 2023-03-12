## Dependency

整体并没有使用开箱即用的组件（比如 AntDesign、Element 等），使用以下基础依赖封装的业务组件

- React Framework: [Next.js](https://nextjs.org/)
- Data Fetching: [SWR](https://swr.vercel.app/)
- CSS Framework: [TailwindCSS](https://tailwindcss.com/docs/installation)
- Component: [HeadlessUI](https://headlessui.com/)
- Chart Component: [Echats](https://echarts.apache.org/handbook/zh/get-started/)
- Svg: [Svg Circle 画图](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/circle)

## Router

- Dashboard: `/dashboard/`
- Pos Api: `/posapi/`
- Chain Api Detail: `/chain/chainId/`
- IPFS: `/ipfs/`
- Node: `/node/`
- Premium: `/premium/`
- Premium 定位 Plan: `/premium?chainid={chainid}`
- Settings: `/setting/`
- Login: `/login/`
- Signup: `/signup/`
- Onboard: `/onboard/`
- Verify: `/verify?token={token}`
- Forget Password: `/forgetpassword?token={token}`

## Deploy

采用客户端渲染方式，并未有 SEO 需求，因此并未采用 SSR 等方式

- npm run build
- npm run start

----

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
