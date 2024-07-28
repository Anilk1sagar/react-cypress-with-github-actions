import { defineConfig } from "cypress";

export default defineConfig({
  experimentalMemoryManagement: true,
  retries: {
    runMode: 2,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
