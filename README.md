This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Portfolio chatbot

The `/api/chat` route keeps provider credentials on the server and sends requests to a self-hosted [9Router gateway](https://github.com/decolua/9router). Configure the gateway with the Codex OAuth and/or Antigravity/Google auth connections, then expose its API through an HTTPS URL reachable by the portfolio server.

Copy `.env.example` to `.env.local` and set the provider values that apply to your deployment:

```bash
NINEROUTER_BASE_URL=https://your-public-9router.example/v1
NINEROUTER_API_KEY=
NINEROUTER_MODEL=cx/gpt-5.2-codex

# Optional fallbacks when the primary gateway is unavailable.
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openrouter/free
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

`NINEROUTER_MODEL` should match a model ID exposed by the connected 9Router account; use the model identifier shown in its dashboard for Antigravity/Google-backed models. Never use `NEXT_PUBLIC_` for these values. If no provider is configured, the UI shows a clear configuration message instead of pretending that a response was generated.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
