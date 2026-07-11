// Vite config with dual-target support:
// - Local / Lovable preview: Cloudflare Worker preset
// - Netlify: NITRO_PRESET=netlify emits a Netlify Function + static assets
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: process.env.NITRO_PRESET || undefined,
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Rollup treats top-level "use client" / "use server" in deps as an
        // error during the Nitro SSR build. These directives are safe to
        // ignore for server bundling — silence the warning so the build passes.
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" ||
          (typeof warning.message === "string" &&
            warning.message.includes("Module level directives cause errors when bundled"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
