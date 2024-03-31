import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  rollupOptions: {
    external: ["chrome"], // Tell Rollup not to bundle `chrome`
  },
});
