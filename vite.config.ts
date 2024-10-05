// vite.config.ts
import { defineConfig } from 'vitest/config'; // Import from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,            // Enables global APIs like `describe`, `it`, `expect`
    environment: 'jsdom',     // Simulates a DOM environment
    coverage: {
      reporter: ['text', 'json', 'html'], // Generates coverage reports
    },
  },
});
