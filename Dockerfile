# syntax=docker/dockerfile:1
# public-web image — the Astro marketing site (flicktt.com) built to static files and served by nginx, the
# image the NAS pulls from GHCR. The same source still deploys to Cloudflare Workers via the default
# `pnpm build`; here STATIC_BUILD=true drops the adapter for a pure static bundle (see astro.config.mjs).
# Build context is the repo root.

# --- Build stage ---
FROM node:24-slim AS build
WORKDIR /app
# pnpm via corepack, pinned to the major that produced the lockfile (lockfileVersion 9.0).
RUN corepack enable && corepack prepare pnpm@9 --activate

# Reproducible install from the committed lockfile (deps first → cached across source-only changes).
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# Switches astro.config.mjs to the no-adapter static build.
ENV STATIC_BUILD=true
RUN pnpm build

# --- Runtime stage: nginx serving the static bundle ---
FROM nginx:1.27-alpine AS runtime
# Static-site config: clean URLs, immutable hashed assets, no-store on HTML, gzip, JSON access logs.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
# nginx:alpine already runs nginx in the foreground (no CMD override needed).
