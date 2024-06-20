/// <reference types='vitest' />
/// <reference types='vite/client' />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // Assuming you're using a plugin for SVG imports

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      exclude: [...configDefaults.exclude, '**.**js', '**/**.d.ts']
    }
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg']
});
