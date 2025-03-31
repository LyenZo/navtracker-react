import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './localhost.pem')),
    },
    host: '0.0.0.0',  // Permite el acceso desde la red local
    port: 3000,        // Puerto por defecto (puedes cambiarlo si lo necesitas)
  },
  plugins: [react()],
});