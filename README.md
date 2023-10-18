This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install all dependencies:

```bash
npm i
```

Generate prisma client:

```bash
npx prisma generate
```

Edit `.env` file:

```bash
# firebase app config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# firebase auth config
NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CLIENT_ID=
NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CLIENT_SECRET=

# vercel config
NEXT_PUBLIC_URL=
NEXT_PUBLIC_DATABASE_URL=
```

Run the development server:
```bash
npm run dev
```
