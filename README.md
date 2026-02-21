# LlamaDNS

**Free, open-source dynamic DNS.** Claim a subdomain, point it at your server, and update it with a single HTTP request.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

- Free forever
- DNS propagates within 60 seconds
- Up to 5 subdomains per account
- IPv4 and IPv6 support

## Usage

Sign in at [llamadns.org](https://llamadns.org), claim a subdomain, grab your API token, then:

```bash
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver"
```

Your subdomain now points to your current IP. Automate with cron to keep it up to date:

```bash
*/5 * * * * curl -s "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver"
```

## Self-Hosting

### Prerequisites

- Node.js 18+, [pnpm](https://pnpm.io/)
- PostgreSQL ([Neon](https://neon.tech/) recommended)
- Cloudflare account with a DNS zone
- GitHub OAuth app — create one at [github.com/settings/developers](https://github.com/settings/developers) with callback URL `https://yourdomain.com/api/auth/callback/github`

### Setup

```bash
git clone https://github.com/karooolis/llama-dns.git
cd llama-dns
pnpm install
cp .env.example .env
# Fill in your .env values (see below)
pnpm db:push
pnpm dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with DNS edit permissions |
| `CLOUDFLARE_ZONE_ID` | Cloudflare Zone ID for your domain |
| `DOMAIN` | Base domain (e.g. `llamadns.org`) |
| `NEXT_PUBLIC_DOMAIN` | Same as `DOMAIN`, exposed to the browser |

## API Reference

### `GET /update`

Update DNS records for one or more subdomains. Authenticate with your API token.

**Parameters**

| Parameter | Required | Description |
|---|---|---|
| `token` | Yes | API token from your dashboard |
| `domains` | Yes | Comma-separated subdomain names (e.g. `myserver,homelab`) |
| `ip` | No | IPv4 address (auto-detected if omitted) |
| `ipv6` | No | IPv6 address (not auto-detected) |
| `clear` | No | Set to `true` to delete DNS records |
| `verbose` | No | Set to `true` for detailed output |

**Examples**

```bash
# Auto-detect IP
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver"

# Explicit IPv4 + IPv6
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver&ip=203.0.113.42&ipv6=2001:db8::1"

# Multiple subdomains
curl "https://llamadns.org/update?token=YOUR_TOKEN&domains=myserver,homelab"
```

**Response**

One line per domain — `OK` or `KO`:

```
OK
KO
```

With `verbose=true`:

```
myserver UPDATED 203.0.113.42
homelab NOCHANGE
oldserver NOTFOUND
```

Returns `400` if params are missing, `401` for invalid token, `429` if rate-limited (30 req/60s per token).

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Neon](https://neon.tech/) (serverless PostgreSQL)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://authjs.dev/) (GitHub OAuth)
- [Cloudflare DNS API](https://developers.cloudflare.com/api/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)

## Project Structure

```
├── app/
│   ├── update/route.ts         DNS update endpoint
│   ├── dashboard/              Authenticated dashboard
│   ├── api/
│   │   ├── domains/            CRUD for subdomains
│   │   ├── token/              API token management
│   │   └── auth/               NextAuth handler
│   ├── components/             App components
│   ├── design-system/          Reusable UI components
│   └── landing/                Landing page sections
├── lib/
│   ├── cloudflare.ts           Cloudflare DNS client
│   ├── db/schema.ts            Database schema
│   └── rate-limit.ts           Rate limiter
├── queries/                    TanStack Query hooks
├── auth.ts                     NextAuth config
└── drizzle.config.ts           Drizzle Kit config
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b my-feature`)
3. Run `pnpm build` and `pnpm lint` to verify
4. Open a pull request

## License

[MIT](./LICENSE)
