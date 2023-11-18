import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Načtení environment variables ze souboru .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true // Přidá overlay s upozorněním při selhání HMR
    }
  }
});