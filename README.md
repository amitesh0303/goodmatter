# GoodMatter

A private investment community platform connecting accredited investors with curated deal flow, impact-driven founders, and exclusive co-investment opportunities.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: CSS Modules + Global CSS (no Tailwind)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth/DB**: Supabase (@supabase/ssr, @supabase/supabase-js)
- **Font**: Inter via Google Fonts `<link>` tags

## Getting Started

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/               # Next.js App Router pages and server actions
components/        # Reusable React components
  ui/              # Base UI components (Button, Card, Input, Badge, SectionHeading)
  layout/          # Layout components (Header, Footer)
  home/            # Home page section components
lib/supabase/      # Supabase client utilities (browser + server)
proxy.ts           # Next.js 16 auth proxy (protects /investors/dashboard/*)
```

## Environment Variables

See `.env.example` for required variables.
