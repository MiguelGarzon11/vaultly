// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercelAdapter from '@astrojs/vercel';

import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',

  adapter: vercelAdapter(),

  integrations: [react()]
});