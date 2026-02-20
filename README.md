# LlamaDNS

**Free, open-source dynamic DNS.** Claim a subdomain, point it at your server, and update it with a single HTTP request.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## What is LlamaDNS?

LlamaDNS lets you create free subdomains under `llamadns.org` and update their DNS records via a simple HTTP call. No client software required — just `curl`, `wget`, or any HTTP tool.

- Free forever, no credit card
- DNS propagates within 60 seconds (TTL=60)
- Up to 5 subdomains per account
- IPv4 (A) and IPv6 (AAAA) support
- Powered by Cloudflare DNS

## Usage

Sign in at [llamadns.org](https://llamadns.org), claim a subdomain, grab your API token, then:

```bash
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver"
```

That's it. Your subdomain now points to your current IP.

## Self-Hosting

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 10+
- PostgreSQL database ([Neon](https://neon.tech/) recommended)
- Cloudflare account with a DNS zone
- GitHub OAuth app (for authentication)

### Setup

```bash
git clone https://github.com/llamadns/llamadns.org.git
cd llamadns.org
pnpm install
cp .env.example .env
# Fill in your .env values (see Environment Variables below)
pnpm db:push
pnpm dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) |
| `AUTH_SECRET` | Random secret for NextAuth — generate with `openssl rand -base64 32` |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with DNS edit permissions |
| `CLOUDFLARE_ZONE_ID` | Cloudflare Zone ID for your domain |
| `DOMAIN` | Base domain (e.g. `llamadns.org`) |
| `NEXT_PUBLIC_DOMAIN` | Same as `DOMAIN`, exposed to the browser for UI |

## API Reference

### `GET /update`

Update DNS records for one or more subdomains. No session cookie required — authenticate with your API token.

#### Parameters

| Parameter | Required | Description |
|---|---|---|
| `token` | Yes | API token from your dashboard |
| `domains` | Yes | Comma-separated subdomain names (e.g. `myserver,homelab`) |
| `ip` | No | IPv4 address. Auto-detected from request headers if omitted. |
| `ipv6` | No | IPv6 address. Must be provided explicitly (never auto-detected). |
| `clear` | No | Set to `true` to delete all DNS records for the domain(s). |
| `verbose` | No | Set to `true` for detailed per-domain status output. |

#### Examples

```bash
# Auto-detect IP
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver"

# Explicit IPv4
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver&ip=203.0.113.42"

# IPv4 + IPv6
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver&ip=203.0.113.42&ipv6=2001:db8::1"

# Multiple subdomains
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver,homelab"

# Verbose output
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver&verbose=true"

# Clear DNS records
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver&clear=true"
```

#### Response

Default response is one line per domain — `OK` or `KO`.

With `verbose=true`, each line includes detail:

```
myserver UPDATED 203.0.113.42
homelab NOCHANGE
oldserver NOTFOUND
myserver CLEARED
```

Rate limit: 30 requests per 60-second window per token. Returns `429` if exceeded.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [Neon](https://neon.tech/) (serverless PostgreSQL)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Auth**: [NextAuth.js](https://authjs.dev/) (GitHub OAuth)
- **DNS**: [Cloudflare API](https://developers.cloudflare.com/api/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)

## Project Structure

```
app/
  layout.tsx            Root layout
  page.tsx              Landing page
  dashboard/            Authenticated dashboard
  update/route.ts       DNS update endpoint (GET)
  api/
    domains/            CRUD for subdomains
    token/              API token management
    auth/               NextAuth handler
  design-system/        Reusable UI components
  components/           App-specific components
  landing/              Landing page sections
lib/
  cloudflare.ts         Cloudflare DNS API client
  db/schema.ts          Drizzle database schema
  rate-limit.ts         In-memory rate limiter
  constants.ts          App constants
queries/                TanStack Query hooks
auth.ts                 NextAuth configuration
drizzle.config.ts       Drizzle Kit configuration
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:studio` | Open Drizzle Studio (DB GUI) |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b my-feature`)
3. Make your changes
4. Run `pnpm build` and `pnpm lint` to verify
5. Commit and push your branch
6. Open a pull request

## License

[MIT](./LICENSE)
