import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'react-icons/fa',
      'react-icons/md',
      'react-icons/bs',
      'react-icons/ci',
      'react-icons/io',
      'react-icons/sl',
      'react-icons/cg',
      'react-icons/lu',
      'react-icons/pi',
    ],
  },
});
