
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Tauri espera que a porta seja fixa e o ecrã não seja limpo para debug em Rust
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    host: true, // Necessário para mobile/tauri v2
  },
  envPrefix: ['VITE_', 'TAURI_', 'API_'],
  build: {
    // Tauri v2 suporta browsers modernos
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    // Minificação agressiva para performance nativa
    minify: 'esbuild',
    sourcemap: false,
  },
});
