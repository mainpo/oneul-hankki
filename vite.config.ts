import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? process.env.PAGES_REPO;

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : "/",
  test: {
    include: ["src/**/*.test.ts"],
  },
});
