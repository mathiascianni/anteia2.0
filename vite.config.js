import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      manifest: {
        name: 'Anteia',
        short_name: 'Anteia',
        description: 'Anteia, ven a conocer gente',
        theme_color: '#0066ff',
        background_color: '#ffffff',
        display: 'standalone', 
        icons: [
          {
            src: './assets/icon.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/icon.svg', 
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
