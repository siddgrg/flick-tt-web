# flick-tt-web

Astro site for Flick Table Tennis.

Link: https://flick-tt-web.siddhartha-c1d.workers.dev/

## Requirements

- Node.js 22.12.0 or newer
- pnpm

## Setup

```sh
pnpm install
```

## Local development

```sh
pnpm dev
```

Open the site at `http://localhost:4321`.

## Build

```sh
pnpm build
```

## Preview production build

```sh
pnpm preview
```

## Docker deployment

The same source deploys two ways:

- **Cloudflare Workers** — the default `pnpm build` (uses the `@astrojs/cloudflare` adapter), unchanged.
- **Static image for the NAS** — `STATIC_BUILD=true` drops the adapter and emits a pure static `dist/`
  served by nginx. This is what runs on the Synology NAS.

CI (`.github/workflows/build-and-push.yml`) builds and pushes the image to GHCR on every push to `master`,
tagged by commit id:

- `ghcr.io/flicktt/public-web:latest` and `:<commit-id>` (short SHA)

Build it locally with:

```sh
docker build -t public-web .
docker run --rm -p 8080:80 public-web   # http://localhost:8080
```

## Notes

- Uses Astro with Cloudflare adapter (default) + a static/nginx build for Docker, and Tailwind CSS
- Pages live under `src/pages`
- Components live under `src/components`
- Static assets live in `public`
