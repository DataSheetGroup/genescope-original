import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: process.env.NITRO_PRESET || undefined,
    },
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Rollup treats top-level "use client" / "use server" directives in
          // dependencies as errors during the Nitro SSR build. They're safe
          // to ignore for server bundling — silence to let the build pass.
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
  },
});
