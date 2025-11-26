import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/zafrin_birthday_25/', // MUST MATCH REPO NAME EXACTLY
});
