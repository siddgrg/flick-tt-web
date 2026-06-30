// @ts-check

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";

// The same source builds two ways:
//   - default        (`pnpm build`)                   → Cloudflare Workers, via the @astrojs/cloudflare adapter (unchanged).
//   - STATIC_BUILD=true (`STATIC_BUILD=true pnpm build`) → a pure static `dist/` for the nginx Docker image the NAS serves.
// The site is fully prerendered (no SSR routes), so dropping the adapter yields a clean static bundle.
const staticBuild = process.env.STATIC_BUILD === "true";

// https://astro.build/config
export default defineConfig({
	image: {
		service: passthroughImageService(),
	},

	vite: {
		plugins: [tailwindcss()],
	},

	// No adapter in static mode — Astro emits plain HTML/CSS/JS to `dist/` that nginx serves directly.
	...(staticBuild ? {} : { adapter: cloudflare() }),
});
